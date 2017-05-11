import {Component, Input} from '@angular/core';

@Component({
  selector: 'video-wrapper',
  template: `<my-video [video]="video"></my-video>`
})
export class VideoWrapperComponent {
  private video = {
    title: 'my fake title',
    src: '',
    description: 'here is the descr',
    views: 10,
    likes: 9
  };
}
