import { VideoItem } from './video/video-item';

const FAKE_VIDEOS = [
  {
    title: 'Scruffy McPurrrr',
    src: '/assets/images/cat-00.png',
    description: 'Scruffy McPurrrr is a world famous kitty known for his escapades around the world purring on laps!',
    views: 100,
    likes: 49329,
    date: '2016-11-25'
  },
  {
    title: 'The Itty Bitty Kitty Comittee',
    src: '/assets/images/cat-01.jpg',
    description: 'The Itty Bitty Kitty Comittee are a collection of felines coming for you!',
    views: 100,
    likes: 20,
    date: '2016-11-21'
  }, {
    title: 'IT A KITTY!',
    src: '/assets/images/cat-02.jpg',
    description: 'It\'s a kitty, I mean, how are you not in love with him?',
    views: 100,
    likes: 20,
    date: '2016-10-02'

  }, {
    title: 'Cate Purrton\'s C.I. Purr Edition Cover',
    src: '/assets/images/cat-03.jpg',
    description: 'We don\'t hear any Cat\'s Illustrated readers complaining about Purrton\'s cover.',
    views: 100,
    likes: 20,
    date: '2016-09-02'
  },
  {
    title: 'SINGLE SUNSHINE',
    src: '/assets/images/cat-04.jpg',
    description: 'It was cat for at least an hour. It was incredible. The camera could not capture the vivid intensity ' +
    'and brightness. Look into the mirror, look into your soul! What it means.',
    views: 100,
    likes: 20,
    date: '2016-08-02'
  },
  {
    title: 'Mittens',
    src: '/assets/images/cat-05.png',
    description: 'Mitty is a kitty with white mittens for paws!',
    views: 24,
    likes: 3,
    date: '2014-06-12'
  }, {
    title: 'Cinco de Gato',
    src: '/assets/images/cat-06.jpg',
    description: 'To be totally fair, we also wound up celebrating Moewloween, Purrster, Scratching Day, Good Kitty ' +
    'Day, All Cats Day, and various bank holidays in the exact same way.',
    views: 5,
    likes: 5,
    date: '2017-05-05'
  },
  {
    title: 'Oops, looks like a bug!',
    src: '/assets/images/dog.jpg',
    description: 'BAMBOOZLED!',
    views: 891,
    likes: 1,
    date: '2016-08-02'
  },
  {
    title: 'Koffee Kat',
    src: '/assets/images/cat-07.jpg',
    description: 'Somedays you really did have too much coffee... That\'s everyday for Koffee Kat',
    views: 322,
    likes: 98,
    date: '2016-02-02'
  },
  {
    title: 'Bengalore visist Bengalore',
    src: '/assets/images/cat-08.jpg',
    description: 'Bengalore vlog in India.',
    views: 404,
    likes: 22,
    date: '2016-08-02'
  },
  {
    title: 'Scooby (CLICKBAIT!!!)',
    src: '/assets/images/cat-09.jpg',
    description: 'It\'s a cat not a doo.',
    views: 1969,
    likes: 987,
    date: '2016-08-02'
  },
  {
    title: 'Kitty Tikki Masala',
    src: '/assets/images/cat-10.jpg',
    description: 'Watch a kitty eat chicken tikki masala.',
    views: 231,
    likes: 43,
    date: '2016-05-13'
  },
  {
    title: 'ColourBall Paint',
    src: '/assets/images/cat-11.jpg',
    description: 'Speed tutorial of cat painting portrait',
    views: 1231,
    likes: 203,
    date: '2016-11-28'
  },
  {
    title: 'Emerson Meows At Graduation',
    src: '/assets/images/cat-12.jpg',
    description: 'Emerson the cat graduates from Emerson College.',
    views: 385,
    likes: 34,
    date: '2015-05-12'
  },
  {
    title: 'Pepperoni Has His First Pizza',
    src: '/assets/images/cat-13.jpg',
    description: 'A cat has a slice of pizza!',
    views: 432,
    likes: 56,
    date: '2016-08-02'
  },
  {
    title: 'Nikki\'s First Feast',
    src: '/assets/images/cat-14.jpg',
    description: 'Nikki tries fancy cat food.',
    views: 99,
    likes: 1,
    date: '2016-09-23'
  },
  {
    title: 'Thunder Scared Of Lightning',
    src: '/assets/images/cat-15.jpg',
    description: 'Thunder scared to meet the new member of our family.',
    views: 132,
    likes: 23,
    date: '2016-08-02'
  },
  {
    title: 'Tacocat',
    src: '/assets/images/cat-16.jpg',
    description: 'It\'s a palindrome... And a cat eating a taco...',
    views: 314,
    likes: 15,
    date: '2015-03-14'
  },
  {
    title: 'Perseus Flies',
    src: '/assets/images/cat-17.jpg',
    description: 'Perseus first trip on a plane.',
    views: 761,
    likes: 31,
    date: '2015-11-02'
  },
  {
    title: 'Gus',
    src: '/assets/images/cat-18.jpg',
    description: 'Come on, it\'s a cat video',
    views: 893,
    likes: 243,
    date: '2017-05-10'
  },
];

export const Api = {
  fetch(searchString: string): Array<VideoItem> {
    return FAKE_VIDEOS.filter((video) =>
      video.title.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
    );
  }
};
