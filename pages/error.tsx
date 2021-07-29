import Link from 'next/link'
import { ExclamationIcon } from '@heroicons/react/outline'

const Error = () => (
  <div className="mt-10">
    <div className="flex items-center mb-5">
      <ExclamationIcon className="h-12 text-yellow-300 mr-2" />
      <h3 className="font-bold">Eメールアドレスは既に使用されています。</h3>
    </div>
    <p className="mb-5">
      お申し込みのEメールアドレスを使用するアカウントは既に登録されています。 <br />
      一度ログアウトしてからログインするか、異なるEメールアドレスを使用してご登録お願いいたします。
    </p>
    <Link href="/courses">
      <a className="text-sm mb-10 cursor-pointer hover:opacity-50 transition duration-300">
        コース一覧へ戻る
      </a>
    </Link>
  </div>
)

export default Error
