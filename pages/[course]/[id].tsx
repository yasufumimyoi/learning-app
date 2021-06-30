import { useRouter } from 'next/router'
import Player from '../../components/Player'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { toggleStatus } from '../../redux/video'
import { writeFirestore } from '../../firebase/function'

const Video = () => {
  const router = useRouter()
  const { id } = router.query
  const { uid } = useAppSelector((state) => state.user)
  const { videos } = useAppSelector((state) => state.video)
  const selectedVideo = videos?.filter((video) => video.id === id)
  const dispath = useAppDispatch()

  const onChange = (e: any) => {
    const toggleCompleted = videos?.map(({ id, url, title, image, path, completed, category }) => {
      if (id === e.target.id) {
        completed = !completed
        console.log(completed)
        writeFirestore(id, url, title, image, path, completed, category, uid)
      }

      return {
        id,
        url,
        title,
        image,
        path,
        completed,
        category,
      }
    })

    dispath(toggleStatus(toggleCompleted))
  }

  return (
    <div className="text-white">
      {selectedVideo.map((video) => (
        <div key={video.id}>
          <div className="aspect-w-16 aspect-h-9">
            <Player url={video.url} />
          </div>
          <p className="font-bold text-xl mt-5">{video.title}</p>
          <div className="flex items-center h-5">
            <input
              id={video.id}
              name="comments"
              type="checkbox"
              checked={video.completed}
              onChange={(e) => onChange(e)}
              className="focus:ring-transparent h-4 w-4 text-green-400 rounded"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Video
