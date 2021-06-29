import { useRouter } from 'next/router'
import { firebase } from '../firebase/config'

const Auth = () => {
  const router = useRouter()

  const handleGuestLogin = () => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        router.push('/courses')
        firebase.auth().signInAnonymously()
      })
      .catch(function (error) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <div className="flex">
      <div className="mr-4">
        <button
          className="bg-green-500 text-white rounded px-8 py-2 focus:outline-none"
          onClick={handleGuestLogin}
        >
          GUEST
        </button>
      </div>
      <div>
        <button
          className="bg-green-500 text-white rounded px-8 py-2 focus:outline-none"
          onClick={() => router.push('/signin')}
        >
          SIGNIN
        </button>
      </div>
    </div>
  )
}

export default Auth
