import { firebase } from '../firebase/config'
import { useEffect, useState } from 'react'
import SwiperCore, { Autoplay, Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ja'
import Link from 'next/link'

type Props = {
  title: string
  createdAt: Date
  name: string
  uid: string
}

SwiperCore.use([Autoplay, Virtual])
dayjs.extend(relativeTime)
dayjs.locale(`ja`)

const MissionSwiper = () => {
  const [mission, setMission] = useState<Props[] | undefined>([])

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
          const uid = doc.data().uid
          temp.title = title
          temp.createdAt = createdAt
          temp.name = name
          temp.uid = uid
          data.push(temp)
        })
        setMission(data)
      })
  }, [])

  const params = {
    autoplay: {
      delay: 2500,
    },
    breakpoints: {
      640: {
        width: 640,
        slidesPerView: 1,
      },
      768: {
        width: 768,
        slidesPerView: 2,
      },
      1024: {
        width: 1024,
        slidesPerView: 3,
      },
    },
  }
  return (
    <div className="mb-10">
      <Swiper {...params} spaceBetween={50} virtual>
        {mission?.map((slideContent, index) => {
          return (
            <SwiperSlide key={slideContent.title} virtualIndex={index}>
              <p className="font-bold mb-2">
                <Link as={`/user/${slideContent.uid}`} href="/user/[id]" key={slideContent.title}>
                  <a className=" text-green-600 underline">
                    {slideContent.name !== ''
                      ? `${slideContent.name}さんが `
                      : 'ゲストユーザーさんが'}
                  </a>
                </Link>
              </p>
              <p className="text-sm mb-1">{'『' + slideContent.title + '』' + 'を視聴しました'}</p>
              <p>{dayjs(slideContent.createdAt).fromNow()}</p>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default MissionSwiper
