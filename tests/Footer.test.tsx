import { render } from '@testing-library/react'
import Footer from '../components/Footer'

it('Footerのsnpapshot"', () => {
  const component = render(<Footer />)
  expect(component).toMatchSnapshot()
})
