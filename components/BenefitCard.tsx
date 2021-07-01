import Image from 'next/image'
import { CardProps } from '../types/index'

const BenefitCard = ({ title, text, image }: CardProps) => (
  <div>
    <div className="rounded-xl flex flex-col items-center p-5 shadow-2xl">
      <Image src={image} alt="" width={300} height={300} />
      <h3 className=" mb-5 font-black">{title}</h3>
      <p className=" text-sm">{text}</p>
    </div>
  </div>
)

export default BenefitCard
