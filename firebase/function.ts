import { firebase } from './config'
import { ProfileProps } from '../types/index'

export const writeFirestore = (
  id: string,
  url: string,
  title: string,
  image: string,
  path: string,
  completed: boolean,
  category: string,
  flag: boolean,
  uid: string
) => {
  const time = firebase.firestore.Timestamp.fromMillis(new Date() as any)
  const createdAt = time.seconds
  try {
    firebase.firestore().collection('users').doc(uid).collection('videos').doc(id).set({
      id,
      url,
      title,
      image,
      path,
      completed,
      category,
      flag,
    })
    if (completed) {
      firebase.firestore().collection('activity').doc().set({
        title,
        createdAt,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const removeFirestore = (id: string, uid: string) => {
  try {
    firebase.firestore().collection('users').doc(uid).collection('lists').doc(id).delete()
  } catch (error) {
    console.log(error)
  }
}

export const editFireStore = (uid: string, data: ProfileProps) => {
  console.log('hey')
  try {
    firebase.firestore().collection('users').doc(uid).collection('profile').doc('detail').set({
      name: data.name,
      location: data.location,
      comment: data.comment,
      image: data.image,
    })
  } catch (error) {
    console.log(error)
  }
}
