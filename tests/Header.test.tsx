import { render, screen } from '@testing-library/react'
import Header from '../components/Header'
import { Provider } from 'react-redux'
import store from '../redux/store'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

it('Headerのsnapshot"', () => {
  useRouter.mockImplementationOnce(() => ({
    pathname: '/courses',
  }))
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  )
  const element = screen.getByText(/SIGNUP/)
  expect(element).toBeInTheDocument()
})

it('/coursesの時のHeader表示"', () => {
  useRouter.mockImplementationOnce(() => ({
    pathname: '/courses',
  }))
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  )
  const element = screen.getByText(/SIGNUP/)
  expect(element).toBeInTheDocument()
})
