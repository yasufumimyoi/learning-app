import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Course = () => {
  const reactVideo = [
    {
      id: 1,
      url: 'https://www.youtube.com/watch?v=ufodJVcpmps&t=2068s',
      image: 'http://img.youtube.com/vi/ufodJVcpmps/mqdefault.jpg',
      title: 'Build a Movie APP With React | React Tutorial for Beginners',
      path: '/courses/react/1',
      completed: false,
    },
    {
      id: 2,
      url: 'https://www.youtube.com/watch?v=GuA0_Z1llYU&t=1465s',
      image: 'http://img.youtube.com/vi/GuA0_Z1llYU/mqdefault.jpg',
      title: 'Build a Weather App in React JS | React JS beginner Tutorial',
      path: '/courses/react/2',
      completed: false,
    },
    {
      id: 3,
      url: 'https://www.youtube.com/watch?v=U9T6YkEDkMo',
      image: 'http://img.youtube.com/vi/U9T6YkEDkMo/mqdefault.jpg',
      title: 'Build a Recipe App With React | React Tutorial For Beginners',
      path: '/courses/react/3',
      completed: false,
    },
    {
      id: 4,
      url: 'https://www.youtube.com/watch?v=hQAHSlTtcmY',
      image: 'http://img.youtube.com/vi/hQAHSlTtcmY/mqdefault.jpg',
      title: 'Learn React In 30 Minutes',
      path: '/courses/react/4',
      completed: false,
    },
    {
      id: 5,
      url: 'https://www.youtube.com/watch?v=DLX62G4lc44',
      image: 'http://img.youtube.com/vi/DLX62G4lc44/mqdefault.jpg',
      title: 'Learn React JS - Full Course for Beginners - Tutorial 2019',
      path: '/courses/react/5',
      completed: false,
    },
    {
      id: 6,
      url: 'https://www.youtube.com/watch?v=khJlrj3Y6Ls&t=124s',
      image: 'http://img.youtube.com/vi/khJlrj3Y6Ls/mqdefault.jpg',
      title:
        'Build a COVID-19 Tracker Application - React JS Project (Hooks, Material UI, Charts js)',
      path: '/courses/react/6',
      completed: false,
    },
    {
      id: 7,
      url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
      image: 'http://img.youtube.com/vi/w7ejDZ8SWv8/mqdefault.jpg',
      title: 'React JS Crash Course 2021',
      path: '/courses/react/7',
      completed: false,
    },
    {
      id: 8,
      url: 'https://www.youtube.com/watch?v=o5CdCETh8cQ&t=1555s',
      image: 'http://img.youtube.com/vi/o5CdCETh8cQ/mqdefault.jpg',
      title: 'React Fetch API Data | Build and Deploy a Real Advice App Project',
      path: '/courses/react/8',
      completed: false,
    },
    {
      id: 9,
      url: 'https://www.youtube.com/watch?v=YaioUnMw0mo',
      image: 'http://img.youtube.com/vi/YaioUnMw0mo/mqdefault.jpg',
      title: 'React App - Breaking Bad API',
      path: '/courses/react/9',
      completed: false,
    },
  ]
  const router = useRouter()
  const { course } = router.query

  return (
    <div className="text-white grid md:grid-cols-3 gap-6 mb-16">
      {reactVideo.map((video) => (
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
