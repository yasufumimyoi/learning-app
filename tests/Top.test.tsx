import { render } from '@testing-library/react'
import Top from '../components/Top'

it('Topのsnapshot"', () => {
  const component = render(<Top />)
  expect(component).toMatchSnapshot()
})
