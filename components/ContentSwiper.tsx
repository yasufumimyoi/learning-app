import SwiperCore, { Autoplay, Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
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
        <Image src="/aws.svg" alt="AWS" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/docker.svg" alt="Docker" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/firebase.svg" alt="Firebase" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/javascript.svg" alt="JavaScript" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/material-ui.svg" alt="Material-ui" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/node.svg" alt="Node" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/react-router.svg" alt="React-Router" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/react.svg" alt="React" width={200} height={200} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/typescript.svg" alt="TypeScript" width={200} height={200} />
      </SwiperSlide>
    </Swiper>
  )
}

export default ContentSwiper
