import { render, screen } from '@testing-library/react'
import CourseCard from '../components/CourseCard'

it('CourseCardのsnapshot"', () => {
  const component = render(<CourseCard title="AWS" image="/aws.svg" />)
  expect(component).toMatchSnapshot()
})

it('画像の表示', () => {
  const { getByAltText } = render(<CourseCard title="AWS" image="/aws.svg" />)
  getByAltText('AWS')
})

it('コース名の表示', () => {
  render(<CourseCard title="AWS" image="/aws.svg" />)
  const element = screen.getByText(/AWS/)
  expect(element).toBeInTheDocument()
})
