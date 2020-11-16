import {Component} from '@angular/core';
import {ContextService} from './context.service';
import {VideoComponent} from '../video/video.component';

@Component({
  selector: 'my-ad',
  templateUrl: 'context.html'
})
export class ContextComponent {
  text: string;
  /*d:contextComponentUseSolved*/
  constructor(public parent: VideoComponent,
              private  service: ContextService) {
  }

  ngOnInit() {
    this.text = this.service
      .getAdText(this.parent.video.description);
  }
  /*/d*/
}
