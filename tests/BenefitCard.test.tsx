import { render } from '@testing-library/react'
import BenefitCard from '../components/BenefitCard'

it('BenefitCardのsnapshot"', () => {
  const component = render(
    <BenefitCard
      title="Progress"
      text="Missionをこなして達成率を上げてみよう。それぞれのコースの達成率を管理・把握出来る。"
      image="/card01.svg"
    />
  )
  expect(component).toMatchSnapshot()
})

it('画像の表示', () => {
  const { getByAltText } = render(
    <BenefitCard
      title="Progress"
      text="Missionをこなして達成率を上げてみよう。それぞれのコースの達成率を管理・把握出来る。"
      image="/card01.svg"
    />
  )
  getByAltText('Progress')
})
