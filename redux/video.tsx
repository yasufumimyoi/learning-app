import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VideoProps } from '../types/index'

type State = {
  videos: VideoProps[] | undefined
}

const initialState: State = {
  videos: [],
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    toggleStatus: (state: State, action: PayloadAction<VideoProps[]>) => {
      state.videos = action.payload
    },
  },
})

export const { toggleStatus } = videoSlice.actions

export default videoSlice.reducer
