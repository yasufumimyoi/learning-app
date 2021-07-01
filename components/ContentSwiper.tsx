import SwiperCore, { Autoplay, Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import Image from 'next/image'

SwiperCore.use([Autoplay, Virtual])

const ContentSwiper = () => {
  const params = {
    spaceBetween: 30,
    autoplay: {
      delay: 2500,
    },
  }
  return (
    <Swiper {...params} slidesPerView={3}>
      <SwiperSlide>
        <Image src="/aws.svg" alt="" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/docker.svg" alt="" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/firebase.svg" alt="" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/javascript.svg" alt="" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/material-ui.svg" alt="" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/node.svg" alt="" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/react-router.svg" alt="" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/react.svg" alt="" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/typescript.svg" alt="" width={200} height={200} />
      </SwiperSlide>
    </Swiper>
  )
}

export default ContentSwiper
