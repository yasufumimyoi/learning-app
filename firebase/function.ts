import { firebase } from './config'
import { ProfileProps } from '../types/index'

export const writeFirestore = async (
  id: string,
  url: string,
  title: string,
  image: string,
  path: string,
  completed: boolean,
  category: string,
  flag: boolean,
  clickableBtn: boolean,
  uid: string
) => {
  const createdAt = firebase.firestore.Timestamp.fromDate(new Date())

  try {
    firebase.firestore().collection('users').doc(uid).collection('videos').doc(id).set({
      id,
      url,
      title,
      image,
      path,
      completed,
      category,
      clickableBtn,
      flag,
    })
    if (completed) {
      const userName = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('profile')
        .doc('detail')
        .get()
      if (userName.exists) {
        let name
        await firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .collection('profile')
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              name = doc.data().name
            })
          })
        firebase.firestore().collection('activity').doc(uid).set({
          title,
          createdAt,
          name,
          uid,
        })
      } else {
        firebase.firestore().collection('activity').doc(uid).set({
          title,
          createdAt,
          name: '匿名ユーザー',
        })
      }
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
