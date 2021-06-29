import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type State = {
  uid: string
  isLogin: boolean
}

const initialState: State = {
  uid: '',
  isLogin: false,
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
  },
})

export const { setUid, removeUid, setLogin, Logout } = userSlice.actions

export default userSlice.reducer
