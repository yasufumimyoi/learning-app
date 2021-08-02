import { render } from '@testing-library/react'
import ContentSwiper from '../components/ContentSwiper'

it('ContentSwiperのsnapshot"', () => {
  const component = render(<ContentSwiper />)
  expect(component).toMatchSnapshot()
})

it('コース画像の表示"', () => {
  const { getAllByAltText } = render(<ContentSwiper />)
  getAllByAltText('AWS')
  getAllByAltText('Docker')
  getAllByAltText('Firebase')
  getAllByAltText('JavaScript')
  getAllByAltText('Material-ui')
  getAllByAltText('Node')
  getAllByAltText('React-Router')
  getAllByAltText('React')
  getAllByAltText('TypeScript')
})
