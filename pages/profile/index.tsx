import { firebase } from '../../firebase/config'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { useRouter } from 'next/router'
import { removeUid, Logout, removeProfile } from '../../redux/user'
import { Progress } from '../../components/Progress'
import { CalendarIcon, LocationMarkerIcon, HeartIcon } from '@heroicons/react/outline'

const Profile = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLogin, profile, status } = useAppSelector((state) => state.user)

  const handelDelete = () => {
    if (window.confirm('アカウントを削除しますか？')) {
      const user = firebase.auth().currentUser
      if (user) {
        user
          .delete()
          .then(() => {
            router.push('/')
            dispatch(removeUid())
            dispatch(Logout())
            dispatch(removeProfile())
          })
          .catch((eroor) => {
            console.log(eroor)
          })
      }
    }
  }

  return (
    <div>
      <h3 className="font-bold text-xl mb-10">プロフィール</h3>
      <div>
        {status === 'loading' && <p>Loading..</p>}
        {status === 'success' && (
          <div className="flex flex-col shadow-2xl p-5 rounded mb-5 md:flex-row md:justify-around">
            <div>
              {profile.image ? (
                <img className="mb-5 lg:max-w-lg" src={profile.image} />
              ) : (
                <img className="mb-5 lg:max-w-lg" src="/lazy-weather.jpg" alt="" />
              )}
              <div className="flex items-center mb-4">
                <CalendarIcon className="h-5 text-green-500 mr-2" />
                <p>お名前：{profile.name ? profile.name : 'ゲストユーザー'}</p>
              </div>
              <div className="flex items-center mb-4">
                <LocationMarkerIcon className="h-5 text-green-500  mr-2" />
                <p>地域：{profile.location ? profile.location : '未設定'}</p>
              </div>
              <div className="flex items-center mb-4">
                <HeartIcon className="h-5 text-green-500  mr-2" />
                <p>意気込み：{profile.comment ? profile.comment : '未設定'}</p>
              </div>
              <button
                className="text-white bg-green-500 rounded px-8 py-2 focus:outline-none mb-5 sm:mr-4 sm:mb-0"
                onClick={() => router.push('/profile/edit')}
              >
                プロフィールを編集する
              </button>
              {isLogin && <button onClick={handelDelete}>アカウントを削除する</button>}
            </div>
            <Progress />
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
