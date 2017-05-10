import {VideoItem} from './video/video-item';

const FAKE_VIDEOS = [
  {
    title: 'Scruffy McPurrrr',
    src: '/assets/images/cat-0.png',
    description: 'Scruffy McPurrrr is a world famous kitty known for his escapades around the world purring on laps!',
    views: 100,
    likes: 49329,
    date: '2016-11-25'
  },
  {
    title: 'The Itty Bitty Kitty Comittee',
    src: '/assets/images/cat-1.jpg',
    description: 'The Itty Bitty Kitty Comittee are a collection of felines coming for you!',
    views: 100,
    likes: 20,
    date: '2016-11-21'
  }, {
    title: 'IT A KITTY!',
    src: '/assets/images/cat-2.jpg',
    description: 'It\'s a kitty, I mean, how are you not in love with him?',
    views: 100,
    likes: 20,
    date: '2016-10-02'

  }, {
    title: 'Cate Purrton\'s C.I. Purr Edition Cover',
    src: '/assets/images/cat-3.jpg',
    description: 'We don\'t hear any Cat\'s Illustrated readers complaining about Purrton\'s cover.',
    views: 100,
    likes: 20,
    date: '2016-09-02'
  },
  {
    title: 'SINGLE SUNSHINE',
    src: '/assets/images/cat-4.jpg',
    description: 'It was cat for at least an hour. It was incredible. The camera could not capture the vivid intensity and brightness. Look into the mirror, look into your soul! What it means.',
    views: 100,
    likes: 20,
    date: '2016-08-02'
  },
  {
    title: 'Mittens',
    src: '/assets/images/cat-5.png',
    description: 'Mitty is a kitty with white mittens for paws!',
    views: 100,
    likes: 20,
    date: '2016-08-02'
  }, {
    title: 'Cinco de Gato',
    src: '/assets/images/cat-6.jpg',
    description: 'To be totally fair, we also wound up celebrating Moewloween, Purrster, Scratching Day, Good Kitty Day, All Cates Day, and various bank holidays in the exact same way.',
    views: 100,
    likes: 20,
    date: '2017-05-05'
  },
  {
    title: 'Oops, looks like a bug!',
    src: '/assets/images/dog.jpg',
    description: 'Whoomp there it is...',
    views: 100,
    likes: 20,
    date: '2016-08-02'
  },
  {
    title: 'Koffee Kat',
    src: '/assets/images/cat-7.jpg',
    description: 'Somedays you really did have too much coffee... That\'s everyday for Koffee Kat',
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
