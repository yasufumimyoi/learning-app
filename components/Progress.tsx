import { useEffect, useState } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  PolarRadiusAxis,
} from 'recharts'
import { useAppSelector } from '../types/hooks'
import { VideoProps, ChartProps } from '../types/index'

const InitialData = [
  {
    subject: 'JavaScript',
    Mission: 0,
    fullMark: 9,
  },
  {
    subject: 'Docker',
    Mission: 0,
    fullMark: 9,
  },
  {
    subject: 'Node',
    Mission: 0,
    fullMark: 9,
  },
  {
    subject: 'Router',
    Mission: 0,
    fullMark: 9,
  },
  {
    subject: 'Material-ui',
    Mission: 0,
    fullMark: 9,
  },
  {
    subject: 'Firebase',
    Mission: 0,
    fullMark: 9,
  },
  {
    subject: 'React',
    Mission: 0,
    fullMark: 9,
  },
  {
    subject: 'AWS',
    Mission: 0,
    fullMark: 9,
  },
  {
    subject: 'TypeScript',
    Mission: 0,
    fullMark: 9,
  },
]

export const Progress = () => {
  const { videos } = useAppSelector((state) => state.video)
  const [state, setData] = useState<ChartProps>({ data: [] })

  const chart = () => {
    const temp1 = videos.filter((video: VideoProps) => video.category === 'aws')
    const temp2 = videos.filter((video: VideoProps) => video.category === 'docker')
    const temp3 = videos.filter((video: VideoProps) => video.category === 'firebase')
    const temp4 = videos.filter((video: VideoProps) => video.category === 'javascript')
    const temp5 = videos.filter((video: VideoProps) => video.category === 'node')
    const temp6 = videos.filter((video: VideoProps) => video.category === 'react')
    const temp7 = videos.filter((video: VideoProps) => video.category === 'router')
    const temp8 = videos.filter((video: VideoProps) => video.category === 'typescript')
    const temp9 = videos.filter((video: VideoProps) => video.category === 'material')

    const aws = temp1.filter((video: VideoProps) => video.completed === true)
    const docker = temp2.filter((video: VideoProps) => video.completed === true)
    const fire = temp3.filter((video: VideoProps) => video.completed === true)
    const javascript = temp4.filter((video: VideoProps) => video.completed === true)
    const node = temp5.filter((video: VideoProps) => video.completed === true)
    const react = temp6.filter((video: VideoProps) => video.completed === true)
    const router = temp7.filter((video: VideoProps) => video.completed === true)
    const typescript = temp8.filter((video: VideoProps) => video.completed === true)
    const material = temp9.filter((video: VideoProps) => video.completed === true)

    setData({
      data: [
        { subject: 'JavaScript', Mission: javascript.length, fullMark: 9 },
        { subject: 'Docker', Mission: docker.length, fullMark: 9 },
        { subject: 'Node', Mission: node.length, fullMark: 9 },
        { subject: 'Router', Mission: router.length, fullMark: 9 },
        { subject: 'Material', Mission: material.length, fullMark: 9 },
        { subject: 'Firebase', Mission: fire.length, fullMark: 9 },
        { subject: 'React', Mission: react.length, fullMark: 9 },
        { subject: 'AWS', Mission: aws.length, fullMark: 9 },
        { subject: 'TypeScript', Mission: typescript.length, fullMark: 9 },
      ],
    })
  }

  useEffect(() => {
    chart()
  }, [videos])

  return (
    <div>
      {state.data.length > 0 ? (
        <div className="md:w-96 h-96">
          <ResponsiveContainer>
            <RadarChart data={state.data}>
              <PolarGrid />
              <Tooltip />
              <PolarAngleAxis dataKey="subject" style={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 9]} tick={false} />
              <Radar dataKey="Mission" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <ResponsiveContainer>
          <RadarChart data={InitialData}>
            <PolarGrid />
            <Tooltip />
            <PolarAngleAxis dataKey="subject" style={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 9]} tick={false} />
            <Radar dataKey="Mission" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
