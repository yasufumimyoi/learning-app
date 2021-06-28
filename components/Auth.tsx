import { useRouter } from 'next/router'

const Auth = () => {
  const router = useRouter()
  return (
    <div className="flex">
      <div className="mr-4">
        <button
          className="bg-green-500 text-white rounded px-8 py-2 focus:outline-none"
          onClick={() => router.push('/courses')}
        >
          GUEST SIGNUP
        </button>
      </div>
      <div>
        <button
          className="bg-green-500 text-white rounded px-8 py-2 focus:outline-none"
          onClick={() => router.push('/courses')}
        >
          SIGNIN
        </button>
      </div>
    </div>
  )
}

export default Auth
