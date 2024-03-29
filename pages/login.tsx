import Link from 'next/link'
import { useRouter } from 'next/router'
import { firebase, googleProvider, githubProvider, twitterProvider } from '../firebase/config'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../validation/schemas'
import { useDispatch } from 'react-redux'
import { setLogin } from '../redux/user'

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handelExistingUserEmailLogin = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      dispatch(setLogin())
      await router.push('/courses')
    } catch (error) {
      console.error(error.message)
    }
  }

  const handelExistingUserGoogleLogin = () => {
    try {
      firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(() => {
          dispatch(setLogin())
          router.push('/courses')
        })
    } catch (error) {
      console.error(error.message)
    }
  }

  const handelExistingUserGithubLogin = () => {
    try {
      firebase
        .auth()
        .signInWithPopup(githubProvider)
        .then(() => {
          dispatch(setLogin())
          router.push('/courses')
        })
    } catch (error) {
      console.error(error.message)
    }
  }

  const handelExistingUserTwitterLogin = () => {
    try {
      firebase
        .auth()
        .signInWithPopup(twitterProvider)
        .then(() => {
          dispatch(setLogin())
          router.push('/courses')
        })
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 mt-20 sm:flex sm:justify-around">
        <div className="mb-10">
          <h2 className="font-bold text-2xl mb-8 text-center">Login!!</h2>
          <div className="flex justify-around w-80 mx-auto mb-8">
            <button className="focus:outline-none" onClick={handelExistingUserGoogleLogin}>
              <img
                src="google-icon.svg"
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition duration-300"
              />
            </button>
            <button className="focus:outline-none" onClick={handelExistingUserTwitterLogin}>
              <img
                src="twitter.svg"
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition duration-300"
              />
            </button>
            <button className="focus:outline-none" onClick={handelExistingUserGithubLogin}>
              <img
                src="github-icon.svg"
                className="w-8 rounded h-8 cursor-pointer hover:opacity-80 transition duration-300"
              />
            </button>
          </div>
          <form
            className="flex flex-col w-80 mx-auto sm:mx-0"
            onSubmit={handleSubmit(handelExistingUserEmailLogin)}
          >
            {errors.email && (
              <p className="text-red-500 text-sm text-center">{errors.email.message}</p>
            )}
            <input
              className={`border rounded mb-6 px-8 py-2 outline-none ${
                errors.email ? 'border-red-400' : 'text-base'
              }`}
              type="text"
              placeholder="Email"
              {...register('email')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm text-center">{errors.password.message}</p>
            )}
            <input
              className={`border rounded mb-6 px-8 py-2 outline-none ${
                errors.password ? 'border-red-400' : 'text-base'
              }`}
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            <Link href="/reset">
              <a className="text-center text-xs mb-6 cursor-pointer hover:opacity-50 transition duration-300">
                パスワードをお忘れの方はこちらへ
              </a>
            </Link>
            <button className="text-white bg-green-600 rounded px-8 py-2 focus:outline-none">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
