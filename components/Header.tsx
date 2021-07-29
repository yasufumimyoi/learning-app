import { AcademicCapIcon, LoginIcon, LogoutIcon, UserIcon } from '@heroicons/react/outline'
import HeaderItem from './HeaderItem'
import { useAppSelector, useAppDispatch } from '../types/hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { firebase } from '../firebase/config'
import { removeUid, Logout } from '../redux/user'
import { resetVideos } from '../redux/video'

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
          dispath(resetVideos())
          dispath(Logout())
          sessionStorage.clear()
        })
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <header className="bg-gray-900">
      <div className="flex justify-between text-lg font-bold mb-10 py-5 w-11/12 mx-auto xl:max-w-7xl xl:mx-auto ">
        <div className="flex items-center">
          <button
            className={`flex items-center ${
              pathname === '/' ? 'cursor-auto' : 'group hover:opacity-50 duration-300'
            } `}
            onClick={handleTop}
          >
            <AcademicCapIcon className="h-8 mr-4 text-green-600" />
            <div className="text-white font-bold  text-sm sm:text-base">Mission in Programing</div>
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
              <div className="flex items-center">
                <div className="mr-4">
                  <Link href="/signup">
                    <a>
                      <HeaderItem Icon={LoginIcon} title="SIGNUP" />
                    </a>
                  </Link>
                </div>
                <button onClick={handleLogout}>
                  <HeaderItem Icon={LogoutIcon} title="LOGOUT" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
