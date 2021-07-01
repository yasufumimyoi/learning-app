import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { VideoProps } from '../../types/index'
import { useAppSelector } from '../../types/hooks'
import { LockClosedIcon } from '@heroicons/react/outline'

const Course = () => {
  const router = useRouter()
  const { course } = router.query
  const { videos } = useAppSelector((state) => state.video)

  let selectedList: VideoProps[] = []
  switch (course) {
    case 'aws':
      selectedList = videos.filter((video) => video.category === 'aws')
      break
    case 'docker':
      selectedList = videos.filter((video) => video.category === 'docker')
      break
    case 'firebase':
      selectedList = videos.filter((video) => video.category === 'firebase')
      break
    case 'javascript':
      selectedList = videos.filter((video) => video.category === 'javascript')
      break
    case 'node':
      selectedList = videos.filter((video) => video.category === 'node')
      break
    case 'react':
      selectedList = videos.filter((video) => video.category === 'react')
      break
    case 'router':
      selectedList = videos.filter((video) => video.category === 'router')
      break
    case 'typescript':
      selectedList = videos.filter((video) => video.category === 'typescript')
      break
    case 'material':
      selectedList = videos.filter((video) => video.category === 'material')
      break
    default:
      break
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 pb-16">
      {selectedList.map((video) => {
        return (
          <div className="shadow-2xl rounded-xl p-5 pointer " key={video.id}>
            {video.flag ? (
              <div>
                <p className="font-bold mb-4 leading-6">{video.title}</p>
                <LockClosedIcon className="text-green-600 w-40 h-40 mx-auto" />
              </div>
            ) : (
              <Link as={`/${course}/${video.id}`} href="/[course]/[id]" key={video.id}>
                <a className="cursor-pointer trancate">
                  <div>
                    <p className="font-bold mb-4">{video.title}</p>
                    <Image src={video.image} width={320} height={180} layout="responsive" />
                  </div>
                </a>
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Course
