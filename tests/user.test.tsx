import reducer, {
  setUid,
  removeUid,
  setLogin,
  Logout,
  setProfile,
  removeProfile,
} from '../redux/user'

test('uidのセット', () => {
  expect(reducer(undefined, setUid('aaa'))).toEqual({
    uid: 'aaa',
    isLogin: false,
    profile: {
      name: '',
      location: '',
      comment: '',
      image: '',
    },
    status: '',
    otherUid: '',
  })
})

test('uidのリセット', () => {
  expect(reducer(undefined, removeUid())).toEqual({
    uid: '',
    isLogin: false,
    profile: {
      name: '',
      location: '',
      comment: '',
      image: '',
    },
    status: '',
    otherUid: '',
  })
})

test('ログインのセット', () => {
  expect(reducer(undefined, setLogin())).toEqual({
    uid: '',
    isLogin: true,
    profile: {
      name: '',
      location: '',
      comment: '',
      image: '',
    },
    status: '',
    otherUid: '',
  })
})

test('ログインのリセット', () => {
  expect(reducer(undefined, Logout())).toEqual({
    uid: '',
    isLogin: false,
    profile: {
      name: '',
      location: '',
      comment: '',
      image: '',
    },
    status: '',
    otherUid: '',
  })
})

test('プロフィールのセット', () => {
  const initialData = {
    name: 'aaa',
    location: 'Tokyo',
    comment: 'Lets do it',
    image: 'test',
  }
  expect(reducer(undefined, setProfile(initialData))).toEqual({
    uid: '',
    isLogin: false,
    profile: {
      name: 'aaa',
      location: 'Tokyo',
      comment: 'Lets do it',
      image: 'test',
    },
    status: '',
    otherUid: '',
  })
})

test('プロフィールのリセット', () => {
  expect(reducer(undefined, removeProfile())).toEqual({
    uid: '',
    isLogin: false,
    profile: {
      name: '',
      location: '',
      comment: '',
      image: '',
    },
    status: '',
    otherUid: '',
  })
})
