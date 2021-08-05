import reducer, {
  setVideos,
  resetVideos,
  toggleStatus,
  setCheck,
  setOtherVideos,
  resetOtherVideos,
} from '../redux/video'

test('videoのセット', () => {
  const data = {
    id: 'aws_1',
    url: 'https://www.youtube.com/watch?v=HvrIPQ77xRY',
    image: 'http://img.youtube.com/vi/HvrIPQ77xRY/mqdefault.jpg',
    title: '【AWS 入門】EC2とDockerでHello Worldしよう',
    path: '/courses/aws/1',
    completed: false,
    category: 'aws',
    flag: false,
    clickableBtn: true,
  }
  expect(reducer(undefined, setVideos(data))).toEqual({
    videos: [
      {
        id: 'aws_1',
        url: 'https://www.youtube.com/watch?v=HvrIPQ77xRY',
        image: 'http://img.youtube.com/vi/HvrIPQ77xRY/mqdefault.jpg',
        title: '【AWS 入門】EC2とDockerでHello Worldしよう',
        path: '/courses/aws/1',
        completed: false,
        category: 'aws',
        flag: false,
        clickableBtn: true,
      },
    ],
    otherVideos: [],
    status: '',
    check: false,
  })
})

test('videoのリセット', () => {
  expect(reducer(undefined, resetVideos())).toEqual({
    videos: [],
    otherVideos: [],
    status: '',
    check: false,
  })
})

test('videoのCompleteのToggle', () => {
  const videos = [
    {
      id: 'aws_1',
      url: 'https://www.youtube.com/watch?v=HvrIPQ77xRY',
      image: 'http://img.youtube.com/vi/HvrIPQ77xRY/mqdefault.jpg',
      title: '【AWS 入門】EC2とDockerでHello Worldしよう',
      path: '/courses/aws/1',
      completed: false,
      category: 'aws',
      flag: false,
      clickableBtn: true,
    },
    {
      id: 'aws_1',
      url: 'https://www.youtube.com/watch?v=HvrIPQ77xRY',
      image: 'http://img.youtube.com/vi/HvrIPQ77xRY/mqdefault.jpg',
      title: '【AWS 入門】EC2とDockerでHello Worldしよう',
      path: '/courses/aws/1',
      completed: false,
      category: 'aws',
      flag: false,
      clickableBtn: true,
    },
  ]
  expect(reducer(undefined, toggleStatus(videos))).toEqual({
    videos: [
      {
        id: 'aws_1',
        url: 'https://www.youtube.com/watch?v=HvrIPQ77xRY',
        image: 'http://img.youtube.com/vi/HvrIPQ77xRY/mqdefault.jpg',
        title: '【AWS 入門】EC2とDockerでHello Worldしよう',
        path: '/courses/aws/1',
        completed: false,
        category: 'aws',
        flag: false,
        clickableBtn: true,
      },
      {
        id: 'aws_1',
        url: 'https://www.youtube.com/watch?v=HvrIPQ77xRY',
        image: 'http://img.youtube.com/vi/HvrIPQ77xRY/mqdefault.jpg',
        title: '【AWS 入門】EC2とDockerでHello Worldしよう',
        path: '/courses/aws/1',
        completed: false,
        category: 'aws',
        flag: false,
        clickableBtn: true,
      },
    ],
    otherVideos: [],
    status: '',
    check: false,
  })
})

test('次のビデオを表示させるかの判定', () => {
  expect(reducer(undefined, setCheck(true))).toEqual({
    videos: [],
    otherVideos: [],
    status: '',
    check: true,
  })
})

test('自分以外のユーザーの進捗状況のセット', () => {
  const data = {
    id: 'aws_1',
    url: 'https://www.youtube.com/watch?v=HvrIPQ77xRY',
    image: 'http://img.youtube.com/vi/HvrIPQ77xRY/mqdefault.jpg',
    title: '【AWS 入門】EC2とDockerでHello Worldしよう',
    path: '/courses/aws/1',
    completed: false,
    category: 'aws',
    flag: false,
    clickableBtn: true,
  }
  expect(reducer(undefined, setOtherVideos(data))).toEqual({
    videos: [],
    otherVideos: [
      {
        id: 'aws_1',
        url: 'https://www.youtube.com/watch?v=HvrIPQ77xRY',
        image: 'http://img.youtube.com/vi/HvrIPQ77xRY/mqdefault.jpg',
        title: '【AWS 入門】EC2とDockerでHello Worldしよう',
        path: '/courses/aws/1',
        completed: false,
        category: 'aws',
        flag: false,
        clickableBtn: true,
      },
    ],
    status: '',
    check: false,
  })
})

test('自分以外のユーザーの進捗状況のリセット', () => {
  expect(reducer(undefined, resetOtherVideos())).toEqual({
    videos: [],
    otherVideos: [],
    status: '',
    check: false,
  })
})
