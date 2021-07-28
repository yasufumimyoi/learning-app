import { GetStaticProps } from 'next'
import Link from 'next/link'
import CourseCard from '../../components/CourseCard'
import MissionSwiper from '../../components/MissionSwiper'
import { firebase } from '../../firebase/config'

type CourseProps = {
  title: string
  image: string
  course: string
}

const Courses = ({ data }: { data: CourseProps[] }) => {
  return (
    <div>
      <p className="text-base text-center mb-10 sm:text-xl md:text-2xl">
        <span className="font-bold">Mission</span> をこなして達成率を上げてみよう。
      </p>
      <MissionSwiper />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 pb-16">
        {data.map((course) => (
          <Link as={`/courses/${course.course}`} href="/courses/[course]" key={course.course}>
            <a>
              <CourseCard title={course.title} image={course.image} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = [] as CourseProps[]
  await firebase
    .firestore()
    .collection('course')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const docData = doc.data() as CourseProps
        data.push(docData)
      })
    })
  return { props: { data } }
}

export default Courses
