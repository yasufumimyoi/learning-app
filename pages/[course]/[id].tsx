import { useRouter } from 'next/router'
import Player from '../../components/Player'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { toggleStatus, checkStatus, setCheck } from '../../redux/video'
import { writeFirestore } from '../../firebase/function'
import Swal from 'sweetalert2'
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Image from 'next/image'

// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'

const Video = () => {
  const router = useRouter()
  const { id, course } = router.query
  const { uid } = useAppSelector((state) => state.user)
  const { videos, check } = useAppSelector((state) => state.video)
  const selectedVideo = videos?.filter((video) => video.id === id)
  const dispath = useAppDispatch()

  useEffect(() => {
    dispath(setCheck(false))
    dispath(checkStatus(id))
  }, [id, uid])

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    let nextVideo = ''
    // 視聴した動画のcompletedをtoggleさせる
    const toggleCompleted = videos?.map(
      ({ id, url, title, image, path, completed, category, clickableBtn, flag }) => {
        if (id === e.currentTarget.id) {
          completed = true
          writeFirestore(id, url, title, image, path, completed, category, flag, clickableBtn, uid)
          const nextId = parseInt(id.slice(-1)) + 1
          const nextCourse = id.indexOf('_')
          nextVideo = id.slice(0, nextCourse + 1) + nextId
        }

        // completedした次の動画のロック解除
        if (id === nextVideo) {
          flag = false
          writeFirestore(id, url, title, image, path, completed, category, flag, clickableBtn, uid)

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
    Swal.fire({
      title: 'Mission Completed!',
      text: '次のMissionにアクセス出来るようになりました!',
      icon: 'success',
      focusConfirm: false,
      confirmButtonText: '<div>Next</div>',
      confirmButtonColor: '#059669',
    }).then(() => {
      dispath(toggleStatus(toggleCompleted))
      router.push(`/courses/${course}`)
    })
  }

  return (
    <div>
      {!check ? (
        <div>
          {selectedVideo.map((video) => (
            <div key={video.id}>
              <div className="aspect-w-16 aspect-h-9">
                <Player
                  id={video.id}
                  url={video.url}
                  completed={video.completed}
                  clickableBtn={video.clickableBtn}
                  uid={uid}
                />
              </div>
              <div className="flex items-center mt-5">
                <p className="font-bold text-xl mr-4">{video.title}</p>
                {video.clickableBtn ? (
                  <button
                    className={`text-white rounded px-8 py-2 focus:outline-none bg-green-200 cursor-auto `}
                    disabled={video.clickableBtn}
                  >
                    <div className="flex items-center">
                      <LockClosedIcon className="text-white inline w-5 mr-2" />
                      Locked
                    </div>
                  </button>
                ) : (
                  <button
                    className={`text-white rounded px-8 py-2 focus:outline-none bg-green-600 cursor-pointer `}
                    id={video.id}
                    onClick={onClick}
                    disabled={video.clickableBtn}
                  >
                    <div className="flex items-center">
                      <LockOpenIcon className="text-white inline w-5 mr-2" />
                      Completed
                    </div>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <div>
            <h2 className="font-bold mb-5">申し訳ありません...</h2>
            <p className="mb-3">
              こちらの動画はまだロックが解除されていない為、アクセスする事が出来ません。
            </p>
            <Link href="/courses">
              <a>Course一覧へ戻る</a>
            </Link>
            <div>
              <Image src="/direction.svg" width={400} height={400} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Video
