import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { videoData } from '../../assets/video'
import { VideoProps } from '../../types/index'

const Course = () => {
  const router = useRouter()
  const { course } = router.query

  let selectedList: VideoProps[] = []
  switch (course) {
    case 'aws':
      selectedList = videoData.filter((video) => video.category === 'aws')
      break
    case 'docker':
      selectedList = videoData.filter((video) => video.category === 'docker')
      break
    case 'firebase':
      selectedList = videoData.filter((video) => video.category === 'firebase')
      break
    case 'javascript':
      selectedList = videoData.filter((video) => video.category === 'javascript')
      break
    case 'node':
      selectedList = videoData.filter((video) => video.category === 'node')
      break
    case 'react':
      selectedList = videoData.filter((video) => video.category === 'react')
      break
    case 'router':
      selectedList = videoData.filter((video) => video.category === 'router')
      break
    case 'typescript':
      selectedList = videoData.filter((video) => video.category === 'typescript')
      break
    case 'material':
      selectedList = videoData.filter((video) => video.category === 'material')
      break
    default:
      break
  }
  return (
    <div className="text-white grid md:grid-cols-3 gap-6 pb-16">
      {selectedList.map((video) => (
        <div className="bg-gray-800 rounded-xl p-5" key={video.id}>
          <Link as={`/${course}/${video.id}`} href="/[course]/[id]" key={video.id}>
            <a className="cursor-pointer trancate">
              <div>
                <p className="mb-3">{video.title}</p>
                <Image src={video.image} width={320} height={180} layout="responsive" />
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Course
