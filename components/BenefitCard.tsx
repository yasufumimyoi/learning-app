import Image from 'next/image'
import { CardProps } from '../types/index'

const BenefitCard = ({ title, text, image }: CardProps) => (
  <div>
    <div className="bg-gray-800 rounded-xl flex flex-col items-center p-5">
      <Image src={image} alt="" width={300} height={300} />
      <h3 className="text-white mb-5 font-black">{title}</h3>
      <p className="text-white text-sm">{text}</p>
    </div>
  </div>
)

export default BenefitCard
