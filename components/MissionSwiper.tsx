import { firebase } from '../firebase/config'
import { useEffect, useState } from 'react'
import SwiperCore, { Autoplay, Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import dayjs from 'dayjs'

type Props = {
  title: string
  createdAt: Date
  name: string
}

SwiperCore.use([Autoplay, Virtual])

const MissionSwiper = () => {
  const [test, setTest] = useState<Props[] | undefined>([])

  useEffect(() => {
    const data = [] as Props[]
    firebase
      .firestore()
      .collection('activity')
      .orderBy('createdAt', 'desc')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const temp = {} as Props
          const title = doc.data().title
          const createdAt = doc.data().createdAt.toDate()
          const name = doc.data().name
          temp.title = title
          temp.createdAt = createdAt
          temp.name = name
          data.push(temp)
        })
        setTest(data)
      })
  }, [])

  const params = {
    autoplay: {
      delay: 2500,
    },
  }
  return (
    <div>
      <Swiper {...params} spaceBetween={50} slidesPerView={3} virtual>
        {test?.map((slideContent, index) => {
          return (
            <SwiperSlide key={slideContent.title} virtualIndex={index}>
              <p className="font-bold mb-2">
                {slideContent.name !== '' ? `${slideContent.name}さんが ` : '匿名ユーザーさんが'}
              </p>
              <p className="text-sm mb-1">{slideContent.title + 'を視聴しました'}</p>
              <p>{dayjs(slideContent.createdAt).format('YYYY/MM/DD HH:mm')}</p>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default MissionSwiper
