export type CardProps = {
  title: string
  text: string
  image: string
}

export type VideoProps = {
  id: string
  url: string
  image: string
  title: string
  path: string
  completed: boolean
  category: string
}

export type ProfileProps = {
  name?: string
  location?: string
  comment?: string
  image?: string
}

export type ChartProps = {
  data: { subject: string; Mission: number; fullMark: number }[]
}
