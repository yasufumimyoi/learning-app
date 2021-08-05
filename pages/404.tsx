import Link from 'next/link'
import { useAppSelector } from '../types/hooks'

const NotFound = () => {
  const { uid } = useAppSelector((state) => state.user)
  return (
    <div>
      <h2 className="font-bold mb-5">大変申し訳ございません</h2>
      <p className="mb-5">お探しのページは存在しないか、削除された可能性がございます。</p>
      {uid ? (
        <Link href="/courses">
          <a>コース一覧へ戻る</a>
        </Link>
      ) : (
        <Link href="/">
          <a>Topへ戻る</a>
        </Link>
      )}
    </div>
  )
}

export default NotFound
