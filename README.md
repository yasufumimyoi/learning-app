# Mission in Programing2

## 目次

- アプリ概要
- アプリ機能一覧
- 使用イメージ
- 利用ツール・フレームワーク・ライブラリ
- データ設計
- Firestore セキュリティルールの設定

# アプリ概要

プログラミングの学習サイト・学習記録を管理するアプリです。  
用意されている動画を視聴する事で次々と新たな動画にアクセス出来るようになっております。  
アプリ URL: <https://learning-app-nu.vercel.app/>

# アプリ仕様

## 現在実装済みの機能

| 機能名称                         |                                                     |
| -------------------------------- | --------------------------------------------------- |
| サインアップ                     | メール・SNS でのサインアップ機能                    |
| ログイン / ログアウト            | メール・SNS・匿名ユーザーでのログイン機能           |
| プロフィール登録 / 編集          | ユーザーネーム、ユーザー画像などを登録 / 編集出来る |
| 学習記録閲覧                     | コース別に視聴した動画の本数表示                    |
| 自分以外のユーザーの学習記録閲覧 | コース別に視聴した動画の本数表示                    |
| 動画視聴機能                     | 動画を視聴する毎に新しい動画にアクセス可能になる    |

## 使用イメージ

## 利用ツール・フレームワーク・ライブラリ

- Firebase
  - Firestore
  - Cloud Functions
  - Firebase Authentication
- Vercel （ホスティング先）
- React + React Hooks
- Next.js
- TypeScript
- Tailwindcss
- jest
- React Testing Library
- dayjs
- recharts
- ESLint
- Prettier
- husky

## データ設計

### フロントエンド（redux toolkit）にて管理するデータ

- user
  - uid
  - isLogin
  - profile
    - name
    - location
    - comment
    - image
  - status
  - otherUid: string
- video
  - videos
  - otherVideos
  - status
  - check

### Firestore のデータ設計

users > videos サブコレクション(各ユーザーの動画視聴情報)
| Column | Type | Details |
| ------------ | --------------------------- | ----- |
| id | string | 動画の ID|
| url | string | YouTube 動画の URL|
| image | string | YouTube 動画のサムネイル|
| title | string |　動画のタイトル |
| completed | boolean |　動画が視聴されたかどうか |
| category | string |　コースのカテゴリー |
| flag | boolean |　動画のサムネイルの表示をするかどうか |
| clickableBtn | boolean |　動画が視聴されていれば次の動画にアクセス可能 |

users > profile サブコレクション(ユーザーのプロフィール情報)
| Column | Type | Details |
| ------------ | --------------------------- | ----- |
| name | string | ユーザーネーム |
| location | string | お住まいの地域|
| comment | string | 意気込み|
| image | string |　画像のパス |

activity コレクション(スライダーに表示するユーザーの視聴状況)
| Column | Type | Details |
| ------------ | --------------------------- | ----- |
| name | string | ユーザーネーム |
| title | string | 動画のタイトル|
| createdAt | Timestamp | 動画が視聴された日時|
| uid | string |ユーザー ID |

Course コレクション(getStaticProps で取得してくるコース一覧情報)
| Column | Type | Details |
| ------------ | --------------------------- | ----- |
| course | string | コース名|
| title | string | コース名|
| image | Timestamp |　各コースの画像パス|
