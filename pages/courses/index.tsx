import Link from 'next/link'
import { CodeIcon } from '@heroicons/react/outline'
import CourseCard from '../../components/CourseCard'

const courseRef = [
  { title: 'React', image: '/react.svg', path: 'react' },
  { title: 'React-Router', image: '/react-router.svg', path: 'router' },
  { title: 'Material-ui', image: '/material-ui.svg', path: 'material' },
  { title: 'JavaScript', image: '/javaScript.svg', path: 'javascript' },
  { title: 'TypeScript', image: '/typeScript.svg', path: 'typescript' },
  { title: 'Node.js', image: '/node.svg', path: 'node' },
  { title: 'Firebase', image: '/firebase.svg', path: 'firebase' },
  { title: 'AWS', image: '/aWS.svg', path: 'aws' },
  { title: 'Docker', image: '/docker.svg', path: 'docker' },
]

const Courses = () => {
  return (
    <div className="text-white bg-gray-900">
      <p className="text-base mb-5 sm:text-xl md:text-2xl">
        Missionをこなして達成率を上げてみよう。
      </p>
      <div className="flex items-center">
        <CodeIcon className="h-6 text-green-400 mr-2" />
        <Link href="/search">
          <a>全てのMission一覧</a>
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 pb-16">
        {courseRef.map((course) => (
          <Link as={`/courses/${course.path}`} href="/courses/[course]" key={course.path}>
            <a>
              <CourseCard title={course.title} image={course.image} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Courses
