import { render } from '@testing-library/react'
import Login from '../components/Login'

it('Loginのsnapshot"', () => {
  const component = render(<Login />)
  expect(component).toMatchSnapshot()
})
