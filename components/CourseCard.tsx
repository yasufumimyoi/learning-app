import Image from 'next/image'

const CourseCard = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="bg-gray-800 rounded-2xl flex flex-col items-center p-5">
      <p className="text-white font-bold mb-2">{title}</p>
      <Image src={image} alt="" width={200} height={200} />
    </div>
  )
}

export default CourseCard
