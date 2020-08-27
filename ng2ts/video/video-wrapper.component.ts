import {Component, Input} from '@angular/core';

@Component({
  selector: 'video-wrapper',
  template: `<my-video [video]="video"></my-video>`
})
export class VideoWrapperComponent {
  private video = {
    date: new Date().toDateString(),
    title: 'Cute Cat',
    src: '/assets/images/cat-00.png',
    description: 'here is the descr',
    views: 10,
    likes: 9
  };
}
