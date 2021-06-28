import { CheckIcon } from '@heroicons/react/outline'

const Top = () => (
  <div className="mb-10">
    <div className="flex items-center mb-3">
      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
      <p className="text-white text-xs md:text-base">
        チュートリアルは終わったけど、次に何を学習したらいいのか分からない...
      </p>
    </div>
    <div className="flex items-center mb-3">
      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
      <p className="text-white text-xs md:text-base">
        基礎は学習したけど、何を作っていいのか分からない...
      </p>
    </div>
    <div className="flex items-center mb-3">
      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
      <p className="text-white text-xs md:text-base">
        そんなアナタにおすすめのMission (動画) をPick Upしました！
      </p>
    </div>
  </div>
)

export default Top
