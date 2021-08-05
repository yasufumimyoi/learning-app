import { firebase } from '../../firebase/config'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CalendarIcon, LocationMarkerIcon, HeartIcon } from '@heroicons/react/outline'
import { OtherProgress } from '../../components/OtherProgress'
import { fetchOtherVideoData } from '../../redux/video'
import { setOtherUid } from '../../redux/user'
import { useAppDispatch } from '../../types/hooks'

type Props = {
  name: string
  location: string
  comment: string
  image: string
}

const User = () => {
  const router = useRouter()
  const id = router.query.id as string
  const [profile, setProfile] = useState<Props[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    const data: Props[] = []
    firebase
      .firestore()
      .collection('users')
      .doc(id)
      .collection('profile')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const temp = {} as Props
          const comment = doc.data().comment
          const location = doc.data().location
          const name = doc.data().name
          const image = doc.data().image
          temp.comment = comment
          temp.location = location
          temp.name = name
          temp.image = image
          data.push(temp)
        })
        setProfile(data)
        dispatch(fetchOtherVideoData(id))
        dispatch(setOtherUid(id))
      })
  }, [id])
  return (
    <div>
      {profile.map((t) => (
        <div
          key={t.name}
          className="flex flex-col shadow-2xl p-5 rounded mb-5 md:flex-row md:justify-around"
        >
          <div>
            {t.image ? (
              <img className="mb-5 lg:max-w-lg" src={t.image} />
            ) : (
              <img className="mb-5 lg:max-w-lg" src="/lazy-weather.jpg" alt="" />
            )}
            <div className="flex items-center mb-4">
              <CalendarIcon className="h-5 text-green-500 mr-2" />
              <p>お名前：{t.name ? t.name : 'ゲストユーザー'}</p>
            </div>
            <div className="flex items-center mb-4">
              <LocationMarkerIcon className="h-5 text-green-500  mr-2" />
              <p>地域：{t.location ? t.location : '未設定'}</p>
            </div>
            <div className="flex items-center mb-4">
              <HeartIcon className="h-5 text-green-500  mr-2" />
              <p>意気込み：{t.comment ? t.comment : '未設定'}</p>
            </div>
          </div>
          <OtherProgress />
        </div>
      ))}
    </div>
  )
}

export default User
