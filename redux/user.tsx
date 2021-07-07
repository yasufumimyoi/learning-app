import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { firebase } from '../firebase/config'

export const fetchProfileData = createAsyncThunk(
  'user/fetchProfileData',
  async (uid: string, { dispatch }) => {
    try {
      const dataRef = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('profile')
        .get()
      if (!dataRef.empty) {
        await firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .collection('profile')
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              dispatch(setProfile(doc.data()))
            })
          })
      } else {
        dispatch(
          setProfile({
            name: '',
            location: '',
            comment: '',
            image: '',
          })
        )
        firebase.firestore().collection('users').doc(uid).collection('profile').doc('detail').set({
          name: '',
          location: '',
          comment: '',
          image: '',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
)

type State = {
  uid: string
  isLogin: boolean
  profile: {
    name: string
    location: string
    comment: string
    image: string
  }
  status: string
}

const initialState: State = {
  uid: '',
  isLogin: false,
  profile: {
    name: '',
    location: '',
    comment: '',
    image: '',
  },
  status: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUid: (state: State, action: PayloadAction<string>) => {
      state.uid = action.payload
    },
    removeUid: (state: State) => {
      state.uid = ''
    },
    setLogin: (state: State) => {
      state.isLogin = true
    },
    Logout: (state: State) => {
      state.isLogin = false
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    removeProfile: (state) => {
      state.profile = {
        name: '',
        location: '',
        comment: '',
        image: '',
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchProfileData.fulfilled, (state) => {
      state.status = 'success'
    })
    builder.addCase(fetchProfileData.rejected, (state) => {
      state.status = 'rejected'
    })
  },
})

export const { setUid, removeUid, setLogin, Logout, setProfile, removeProfile } = userSlice.actions

export default userSlice.reducer
