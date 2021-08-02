import { render, screen } from '@testing-library/react'
import MissionSwiper from '../components/MissionSwiper'

it('MissionSwiperのsnapshot"', () => {
  const component = render(<MissionSwiper />)
  expect(component).toMatchSnapshot()
})

it('ユーザーの達成状況の表示"', () => {
  render(<MissionSwiper />)
  const element = screen.getByText(/ゲストユーザーさんが/)
  expect(element).toBeInTheDocument()
})
