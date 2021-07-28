import { firebase } from '../../firebase/config'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CalendarIcon, LocationMarkerIcon, HeartIcon } from '@heroicons/react/outline'
import { OtherProgress } from '../../components/OtherProgress'
import { fetchOtherVideoData } from '../../redux/video'
import { setOtherUid } from '../../redux/user'
import { useAppDispatch } from '../../types/hooks'

const User = () => {
  const router = useRouter()
  const id = router.query.id as string
  const [test, setTest] = useState([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    const data = [] as any
    firebase
      .firestore()
      .collection('users')
      .doc(id)
      .collection('profile')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const temp = {} as any
          const comment = doc.data().comment
          const location = doc.data().location
          const name = doc.data().name
          temp.comment = comment
          temp.location = location
          temp.name = name
          data.push(temp)
        })
        setTest(data)
        dispatch(fetchOtherVideoData(id))
        dispatch(setOtherUid(id))
      })
    console.log('how many')
  }, [id])
  return (
    <div>
      {test.map((t: any) => (
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
