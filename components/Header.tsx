import { AcademicCapIcon, LoginIcon, LogoutIcon, UserIcon } from '@heroicons/react/outline'
import HeaderItem from './HeaderItem'
import { useAppSelector, useAppDispatch } from '../types/hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { firebase } from '../firebase/config'
import { removeUid, Logout } from '../redux/user'

const Header = () => {
  const { isLogin } = useAppSelector((state) => state.user)
  const dispath = useAppDispatch()
  const router = useRouter()
  const { pathname } = router

  const handleTop = () => {
    if (pathname !== '/') {
      router.push('/courses')
    }
  }

  const handleLogout = () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトしました')
          router.push('/')
          dispath(removeUid())
          dispath(Logout())
          sessionStorage.clear()
        })
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <header className="flex justify-between text-white text-lg font-bold mb-10 pt-8">
      <div className="flex items-center">
        <button
          className={`flex items-center ${pathname === '/' && 'cursor-auto'}`}
          onClick={handleTop}
        >
          <AcademicCapIcon className="h-8 mr-4 text-green-400" />
          <div className="font-bold">Mission in Programing</div>
        </button>
      </div>
      {pathname !== '/' && pathname !== '/login' && (
        <div className="flex items-center">
          <div className="mr-4">
            <Link href="/profile">
              <a>
                <HeaderItem Icon={UserIcon} title="PROFILE" />
              </a>
            </Link>
          </div>
          {isLogin ? (
            <button onClick={handleLogout}>
              <HeaderItem Icon={LogoutIcon} title="LOGOUT" />
            </button>
          ) : (
            <Link href="/signup">
              <a>
                <HeaderItem Icon={LoginIcon} title="SIGNUP" />
              </a>
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
