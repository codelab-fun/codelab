import {VideoItem} from './video/video-item';

const FAKE_VIDEOS = [
  {
    title: `Cute kitten`,
    src: '/assets/images/cat-0.png',
    description: `todo`,
    views: 100,
    likes: 49329,
    date: '2016-11-25'
  },
  {
    title: `Kitten on the tree`,
    src: '/assets/images/cat-1.jpg',
    description: 'todo',
    views: 100,
    likes: 20,
    date: '2016-11-21'
  }, {
    title: 'More kitten',
    src: '/assets/images/cat-2.jpg',
    description: 'todo',
    views: 100,
    likes: 20,
    date: '2016-10-02'

  }, {
    title: 'Another kitten',
    src: '/assets/images/cat-3.jpg',
    description: 'todo',
    views: 100,
    likes: 20,
    date: '2016-09-02'
  },
  {
    title: 'Serious cat',
    src: '/assets/images/cat-4.jpg',
    description: 'todo',
    views: 100,
    likes: 20,
    date: '2016-08-02'
  },
  {
    title: 'Serious cat',
    src: '/assets/images/cat-5.jpg',
    description: 'todo',
    views: 100,
    likes: 20,
    date: '2016-08-02'
  }, {
    title: 'Serious cat',
    src: '/assets/images/cat-5.jpg',
    description: 'todo',
    views: 100,
    likes: 20,
    date: '2016-08-02'
  },
  {
    title: 'Oops, looks like a bug!',
    src: '/assets/images/dog.jpg',
    description: 'todo',
    views: 100,
    likes: 20,
    date: '2016-08-02'
  },
  {
    title: 'Serious cat',
    src: '/assets/images/cat-6.jpg',
    description: 'todo',
    views: 100,
    likes: 20,
    date: '2016-08-02'
  },
];

export const Api = {
  fetch(searchString: string): Array<VideoItem> {
    return FAKE_VIDEOS.filter((video) =>
      video.title.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
    );
  }
};
