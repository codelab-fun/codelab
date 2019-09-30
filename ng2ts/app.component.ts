import { Component } from '@angular/core';
/*d:templateAddAction/trimLeading*/
import { VideoItem } from './video/video-item'; /*d:diInjectService/trimLeading*/
/*/d*/ import { VideoService } from './video/video.service'; /*d:templateAllVideos:diInjectService*/
/*/d*/ const FAKE_VIDEOS = [
  {
    title: 'Cute kitten',
    src: '/assets/images/cat-01.jpg'
  },
  {
    title: 'Kitten on the tree',
    src: '/assets/images/cat-05.png'
  },
  {
    title: 'Serious cat',
    src: '/assets/images/cat-03.jpg'
  }
]; /*/d*/ /*d:createComponentSolved*/ /*d:neverShow*/ /* tslint:disable */
/*/d*/ @Component({
  selector: 'my-app' /*d:createComponentSolved:bootstrapSolved/trimBoth*/,
  /*/d*/ template: '<h1>Hello MewTube!</h1>' /*d:templatePageSetup/trimBoth*/,
  /*/d*/ templateUrl: 'app.html' /*d:createComponentSolved/trimTrailing*/
  /*/d*/
})
export class AppComponent {
  /*/d*/ /*d:templateAddActionSolved/trimTrailing*/
  videos: VideoItem[] =
    /*/d*/ /*d:templateAddActionSolved:templateAllVideos/trimTrailing*/ [] /*/d*/ /*d:neverShow*/ &&
    /*/d*/ /*d:templateAllVideosSolved:templateAllVideosSolved/trimTrailing*/ FAKE_VIDEOS /*/d*/ /*d:neverShow*/ &&
    /*/d*/ /*d:diInjectService/trimTrailing*/ [] /*/d*/ /*d:templateAddActionSolved*/; /*d:templatePageSetup/trimTrailing*/
  /*/d*/ title = 'MewTube'; /*d:diInjectServiceSolved*/
  /*/d*/ constructor(
    public videoService: VideoService
  ) {} /*d:templateAddActionSolved/trimTrailing*/
  /*/d*/ search(searchString: string) {
    /*/d*/ /*d:diInjectServiceSolved*/
    this.videos = this.videoService.search(
      searchString
    ); /*d:templateAllVideosSolved:diInjectService*/
    /*/d*/ this.videos = FAKE_VIDEOS.filter(
      video => video.title.indexOf(searchString) >= 0
    ); /*d:templateAddActionSolved/trimBoth*/
    /*/d*/
  } /*d:createComponentSolved/trimTrailing*/
  /*/d*/
} /*d:neverShow*/ // Please ignore
/*/d*/ export function evalJs(string) {
  return string;
}
/*/d*/
