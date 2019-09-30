import { Component } from '@angular/core';
/*d:templateAddAction/trimLeading*/
import { VideoItem } from './video/video-item';
/*/d*//*d:diInjectService/trimLeading*/
import { VideoService } from './video/video.service';
/*/d*//*d:templateAllVideos:diInjectService*/
const FAKE_VIDEOS = [{
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
  }];
/*/d*//*d:neverShow*//* tslint:disable *//*/d*//*d:createComponentSolved*/
@Component({
  selector: 'my-app',
  /*/d*//*d:createComponentSolved:bootstrapSolved/trimBoth*/
  template: '<h1>Hello MewTube!</h1>',
  /*/d*//*d:templatePageSetup/trimBoth*/
  templateUrl: 'app.html'
  /*/d*//*d:createComponentSolved/trimTrailing*/
})
export class AppComponent {
  /*/d*//*d:templateAddActionSolved/trimTrailing*/
  videos: VideoItem[] = /*/d*//*d:templateAddActionSolved:templateAllVideos/trimTrailing*/ [] /*/d*//*d:neverShow*/ &&
    /*/d*//*d:templateAllVideosSolved:templateAllVideosSolved/trimTrailing*/ FAKE_VIDEOS /*/d*//*d:neverShow*/ &&
    /*/d*//*d:diInjectService/trimTrailing*/ [] /*/d*//*d:templateAddActionSolved*/;
/*/d*//*d:templatePageSetup/trimTrailing*/
  title = 'MewTube';
/*/d*//*d:diInjectServiceSolved*/
  constructor(public videoService: VideoService) {
  }
/*/d*//*d:templateAddActionSolved/trimTrailing*/
  search(searchString: string) {
    /*/d*//*d:diInjectServiceSolved*/
    this.videos = this.videoService.search(searchString);
    /*/d*//*d:templateAllVideosSolved:diInjectService*/
    this.videos = FAKE_VIDEOS.filter(video => video.title.indexOf(searchString) >= 0);
  /*/d*//*d:templateAddActionSolved/trimBoth*/}
  /*/d*//*d:createComponentSolved/trimTrailing*/
}
/*/d*//*d:neverShow*/
// Please ignore
export function evalJs(string) {
  return string;
}
/*/d*/
