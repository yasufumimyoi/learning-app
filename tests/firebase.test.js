/**
 * @jest-environment node
 */

const firebase = require('@firebase/rules-unit-testing')
const fs = require('fs')

const projectId = 'my-project'
const databaseName = 'my-db'

describe('Firestoreのテスト', () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: 'my-project',
      databaseName: databaseName,
      rules: fs.readFileSync('./firestore.rules', 'utf8'),
    })
  })

  // ブロックが終わるたび実行
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: projectId }) // データリセット
  })

  // 終わった後に一度だけ実行;
  afterAll(async () => {
    await Promise.all(
      firebase.apps().map((app) => app.delete()) // 生成したアプリを削除
    )
  })

  function authedApp(auth) {
    return firebase
      .initializeTestApp({
        projectId: projectId,
        auth: auth,
      })
      .firestore()
  }

  describe('users', () => {
    // 書き込みテスト
    test('usersの書き込み', async () => {
      const db = authedApp({ uid: 'alice' })
      const message = db.collection('users').doc('alice').collection('videos').doc('react_1')
      await firebase.assertSucceeds(
        message.set({
          id: 'react_1',
          url: 'https://www.youtube.com/watch?v=Bq-DT30hesA',
          title: 'React Lesson 1',
          image: 'http://img.youtube.com/vi/Bq-DT30hesA/mqdefault.jpg',
          path: 'react/react1',
          completed: false,
          category: 'react',
          clickableBtn: false,
          flag: false,
        })
      )
    })

    test('usersの上書き', async () => {
      const db = authedApp({ uid: 'alice' })
      const message = db.collection('users').doc('alice').collection('videos').doc('react_1')
      await firebase.assertSucceeds(
        message.update({
          id: 'react_1',
          url: 'https://www.youtube.com/watch?v=Bq-DT30hesA',
          title: 'React Lesson 1',
          image: 'http://img.youtube.com/vi/Bq-DT30hesA/mqdefault.jpg',
          path: 'react/react1',
          completed: true,
          category: 'react',
          clickableBtn: true,
          flag: true,
        })
      )
    })

    // 読取りテスト
    test('ログイン中のusersの読取り', async () => {
      const db = authedApp({ uid: 'alice' })
      const message = db.collection('users').doc('alice').collection('videos').get()
      await firebase.assertSucceeds(message)
    })

    test('ログイン中でないusersの読取り', async () => {
      const db = authedApp({ uid: 'alice' })
      const message = db.collection('users').doc('bob').collection('videos').get()
      await firebase.assertSucceeds(message)
    })
  })

  describe('activityコレクションのルールテスト', () => {
    // 書き込みテスト
    test('acitvityの書き込み', async () => {
      const db = authedApp({ uid: 'alice' })
      const message = db.collection('activity').doc('alice').set({
        title: 'React Lesson 1',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: 'alice',
        uid: '123abc',
      })
      await firebase.assertSucceeds(message)
    })

    test('acitvityの書き込み失敗', async () => {
      const db = authedApp({ uid: 'alice' })
      const message = db
        .collection('activity')
        .doc('bob')
        .set({ title: 'test', createdAt: '2', test: 'aaa' })
      await firebase.assertFails(message)
    })

    // 読取りテスト
    test('acitvityの読み込み', async () => {
      const db = authedApp({ uid: 'alice' })
      const message = db.collection('activity').doc('alice').get()
      await firebase.assertSucceeds(message)
    })
  })

  describe('profileコレクションのルールテスト', () => {
    // 書き込みテスト
    test('profileの書き込み', async () => {
      const db = authedApp({ uid: 'alice' })
      const message = db.collection('users').doc('alice').collection('profile').doc('detail').set({
        name: '',
        location: '',
        comment: '',
        image: '',
      })
      await firebase.assertSucceeds(message)
    })

    test('profileの書き込み', async () => {
      const db = authedApp({ uid: 'alice' })
      const message = db
        .collection('users')
        .doc('alice')
        .collection('profile')
        .doc('detail')
        .update({
          name: 'Alice',
          location: 'Tokyo',
          comment: 'Hello!!',
          image: 'https://qiita.com/str32/items/a692073af32757618042',
        })
      await firebase.assertSucceeds(message)
    })
  })
})
