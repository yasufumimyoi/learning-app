import Head from 'next/head'
import Image from 'next/image'
import Top from '../components/Top'
import Login from '../components/Login'
import Card from '../components/BenefitCard'
import Description from '../components/Description'
import ContentSwiper from '../components/ContentSwiper'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mission in Programing</title>
        <meta name="description" content="Learn programing via YouTube" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex mb-10">
        <div className="mr-14">
          <Top />
          <Login />
        </div>
        <div className="hidden sm:block">
          <Image src="/mission.svg" alt="mission" width={400} height={400} />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Card
          title="Progress"
          text="Missionをこなして達成率を上げてみよう。それぞれのコースの達成率を管理・把握出来る。"
          image="/card01.svg"
        />
        <Card
          title="Motivation"
          text="視覚的にどのくらい進めたのか分かるので、モチベーションの維持にも繋がる。"
          image="/card02.svg"
        />
        <Card
          title="Output"
          text="分からなかった事をメモしたり、学んだ事もSNSでシェアしてみませんか？"
          image="/card03.svg"
        />
      </div>
      <div className="mb-20">
        <Description />
      </div>
      <div className="mb-20">
        <ContentSwiper />
      </div>
    </div>
  )
}
