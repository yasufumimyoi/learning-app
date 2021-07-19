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

  useEffect(async () => {
    const data = [] as Props[]
    await firebase
      .firestore()
      .collection('activity')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const temp = {}
          const title = doc.data().title
          const time = doc.data().createdAt.toDate()
          temp.title = title
          temp.time = time

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
              <p>{slideContent.name !== '' ? slideContent.name : '匿名ユーザー'}</p>
              <p>{slideContent.title}</p>
              <p>{dayjs(slideContent.createdAt).format('YYYY/MM/DD HH:mm')}</p>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default MissionSwiper
