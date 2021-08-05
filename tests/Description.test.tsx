import { render } from '@testing-library/react'
import Description from '../components/Description'

it('Descriptionのsnapshot"', () => {
  const component = render(<Description />)
  expect(component).toMatchSnapshot()
})
