import { render, screen } from '@testing-library/react'
import HeaderItem from '../components/HeaderItem'
import { AcademicCapIcon } from '@heroicons/react/outline'

it('HeaderItemのsnpapshot"', () => {
  const component = render(<HeaderItem Icon={AcademicCapIcon} title="PROFILE" />)
  expect(component).toMatchSnapshot()
})

it('アイコンの文字表示"', () => {
  render(<HeaderItem Icon={AcademicCapIcon} title="PROFILE" />)
  const element = screen.getByText(/PROFILE/)
  expect(element).toBeInTheDocument()
})
