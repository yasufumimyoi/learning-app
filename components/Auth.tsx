import { useEffect } from 'react'
import { firebase } from '../firebase/config'
import { setUid, setLogin, fetchProfileData } from '../redux/user'
import { useAppDispatch } from '../types/hooks'
import { fetchVideoData } from '../redux/video'

const Auth = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid, isAnonymous } = user
        if (isAnonymous) {
          dispatch(setUid(uid))
          dispatch(fetchVideoData(uid))
          dispatch(fetchProfileData(uid))
        } else {
          dispatch(setUid(uid))
          dispatch(setLogin())
          dispatch(fetchVideoData(uid))
          dispatch(fetchProfileData(uid))
        }
      }
    })
  }, [])

  return <></>
}

export default Auth
