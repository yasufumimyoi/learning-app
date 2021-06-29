import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import videoRducer from './video'

const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoRducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
