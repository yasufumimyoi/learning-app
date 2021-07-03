import ReactPlayer from 'react-player'
import { writeFirestore } from '../firebase/function'
import { useAppSelector, useAppDispatch } from '../types/hooks'
import { toggleStatus } from '../redux/video'

const Player = ({
  id,
  url,
  completed,
  clickableBtn,
  uid,
}: {
  id: string
  url: string
  completed: boolean
  clickableBtn: boolean
  uid: string
}) => {
  const { videos } = useAppSelector((state) => state.video)
  const dispath = useAppDispatch()

  const onProgress = (played: number, completed: boolean, clclickableBtn: boolean, tid: string) => {
    if (played >= 0.98 && !completed && clclickableBtn) {
      const test = videos.map(
        ({ id, url, title, image, path, completed, category, clickableBtn, flag }) => {
          if (tid === id) {
            clickableBtn = false
            writeFirestore(
              id,
              url,
              title,
              image,
              path,
              completed,
              category,
              flag,
              clickableBtn,
              uid
            )
          }

          return {
            id,
            url,
            title,
            image,
            path,
            completed,
            category,
            clickableBtn,
            flag,
          }
        }
      )
      dispath(toggleStatus(test))
    }
  }

  return (
    <div>
      <ReactPlayer
        url={url}
        controls
        onProgress={({ played }) => onProgress(played, completed, clickableBtn, id)}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default Player
