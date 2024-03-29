import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { VideoProps } from '../types/index'
import { firebase } from '../firebase/config'
import { videoData } from '../assets/video'
import { RootState } from '../redux/store'

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
              dispatch(setOtherVideos(doc.data()))
            })
          })
      } else {
        videoData.forEach((video) => {
          dispatch(setVideos(video))
          const { id, url, title, image, path, completed, category, clickableBtn, flag } = video
          firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .collection('videos')
            .doc(id)
            .set({ id, url, title, image, path, completed, category, clickableBtn, flag })
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }
)

export const fetchOtherVideoData = createAsyncThunk(
  'video/fetchOtherVideoData',
  async (uid: string, { dispatch }) => {
    try {
      const dataRef = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('videos')
        .get()
      if (!dataRef.empty) {
        dispatch(resetOtherVideos())
        await firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .collection('videos')
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              dispatch(setOtherVideos(doc.data()))
            })
          })
        console.log('how many')
      }
    } catch (error) {
      console.log(error.message)
    }
  }
)

export const checkStatus = createAsyncThunk(
  'video/checkStatus',
  async (id: string | string[] | undefined, thunkApi) => {
    const { uid } = (thunkApi.getState() as RootState).user
    try {
      const data = [] as any
      await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('videos')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            data.push(doc.data())
          })
        })
      data.forEach((video: VideoProps) => {
        if (video.id === id && video.flag) {
          thunkApi.dispatch(setCheck(true))
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }
)

type State = {
  videos: VideoProps[]
  otherVideos: VideoProps[]
  status: string
  check: boolean
}

const initialState: State = {
  videos: [],
  otherVideos: [],
  status: '',
  check: false,
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideos: (state: State, action) => {
      state.videos?.push(action.payload)
    },
    resetVideos: (state: State) => {
      state.videos = []
    },
    toggleStatus: (state: State, action: PayloadAction<VideoProps[]>) => {
      state.videos = action.payload
    },
    setCheck: (state: State, action: PayloadAction<boolean>) => {
      state.check = action.payload
    },
    setOtherVideos: (state: State, action) => {
      state.otherVideos.push(action.payload)
    },
    resetOtherVideos: (state: State) => {
      state.otherVideos = []
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
      state.status = 'rejected'
    })

    builder.addCase(fetchOtherVideoData.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchOtherVideoData.fulfilled, (state) => {
      state.status = 'success'
    })
    builder.addCase(fetchOtherVideoData.rejected, (state) => {
      state.status = 'rejected'
    })

    builder.addCase(checkStatus.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(checkStatus.fulfilled, (state) => {
      state.status = 'success'
    })
    builder.addCase(checkStatus.rejected, (state) => {
      state.status = 'rejected'
    })
  },
})

export const { toggleStatus, setVideos, setCheck, setOtherVideos, resetOtherVideos, resetVideos } =
  videoSlice.actions

export default videoSlice.reducer
