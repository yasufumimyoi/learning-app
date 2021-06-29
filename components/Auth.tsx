import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { firebase } from '../firebase/config'
import { setUid } from '../redux/user'

const Auth = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid, isAnonymous } = user
        if (isAnonymous) {
          dispatch(setUid(uid))
          console.log('uid', uid)
        } else {
          dispatch(setUid(uid))
        }
      }
    })
  }, [])

  return <></>
}

export default Auth
