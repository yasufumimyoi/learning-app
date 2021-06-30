import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { VideoProps } from '../types/index'
import { firebase } from '../firebase/config'
import { videoData } from '../assets/video'

export const fetchVideoData = createAsyncThunk(
  'video/fetchVideoData',
  async (uid: string, { dispatch }) => {
    try {
      const dataRef = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('videos')
        .get()
      if (!dataRef.empty) {
        await firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .collection('videos')
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              dispatch(setVideos(doc.data()))
            })
          })
      } else {
        videoData.forEach((video) => {
          dispatch(setVideos(video))
          const { id, url, title, image, path, completed, category } = video
          firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .collection('videos')
            .doc(id)
            .set({ id, category, image, title, url, completed, path })
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }
)

type State = {
  videos: VideoProps[]
  status: string
}

const initialState: State = {
  videos: [],
  status: '',
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideos: (state: State, action) => {
      state.videos?.push(action.payload)
    },
    toggleStatus: (state: State, action: PayloadAction<VideoProps[]>) => {
      state.videos = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVideoData.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchVideoData.fulfilled, (state) => {
      state.status = 'success'
    })
    builder.addCase(fetchVideoData.rejected, (state) => {
      state.status = 'rejected9'
    })
  },
})

export const { toggleStatus, setVideos } = videoSlice.actions

export default videoSlice.reducer
