import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { setProfile } from '../../redux/user'
import { editFireStore } from '../../firebase/function'
import { PhotographIcon, DocumentIcon } from '@heroicons/react/outline'
import { firebase } from '../../firebase/config'
import { ProfileProps } from '../../types/index'
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'

const Edit = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { profile, uid } = useAppSelector((state) => state.user)
  const { register, handleSubmit } = useForm()

  const [imageAsFile, setImageAsFile] = useState('')
  const [imageName, setImageName] = useState('')

  const onChange = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    const name: string = (target.files as FileList)[0].name
    const imageData: File = (target.files as FileList)[0]
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(imageData.name)
    await fileRef.put(imageData)
    setImageName(name)
    setImageAsFile(await fileRef.getDownloadURL())
  }

  const onSubmit = async (data: ProfileProps) => {
    if (imageName === '') {
      data.image = profile.image
    } else {
      data.image = imageAsFile
    }
    editFireStore(uid, data)
    dispatch(setProfile(data))
    setImageName('')
    router.push('/profile')
  }

  return (
    <div className="mx-auto  w-2/3 mt-14 mb-14">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            お名前
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-green-400 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            type="text"
            placeholder="山田太郎"
            defaultValue={profile.name}
            {...register('name')}
          />
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            地域
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-green-400 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            type="text"
            placeholder="東京都"
            defaultValue={profile.location}
            {...register('location')}
          />
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            意気込み
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-green-400 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            type="text"
            placeholder="頑張ります！"
            defaultValue={profile.comment}
            {...register('comment')}
          />
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
            アップロード
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-green-300 group transition duration-300">
              <div className="flex flex-col items-center justify-center pt-7">
                <PhotographIcon className="w-10 h-10 text-green-400 group-hover:text-green-600 transition duration-300" />
                <p className="lowercase text-sm text-gray-400 group-hover:text-green-600 pt-1 tracking-wider transition duration-300">
                  Select a photo
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                defaultValue={imageAsFile}
                {...register('image')}
                onChange={onChange}
              />
            </label>
          </div>
        </div>

        {imageName && (
          <div className="flex items-center justify-center mt-8">
            <div>
              <DocumentIcon className="w-10 h-10 text-green-400" />
              {imageName}
            </div>
          </div>
        )}

        <div className="text-center mt-10">
          <button
            className="text-white bg-green-500 rounded px-8 py-2 focus:outline-none"
            type="submit"
          >
            プロフィールを更新する
          </button>
        </div>
      </form>
    </div>
  )
}

export default Edit
