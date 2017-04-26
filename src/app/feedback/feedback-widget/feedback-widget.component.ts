import {Component, OnInit, ElementRef} from '@angular/core';
import {AngularFireModule, AuthProviders, AuthMethods, AngularFire} from 'angularfire2';

import {PresentationComponent} from "../../presentation/presentation/presentation.component";
@Component({
  selector: 'app-feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit {
  open = false;
  email: string = '';
  name:string = '';
  comment: string = '';
  statusMessage:string = '';
  error = false;

  constructor(private angularFire: AngularFire, private el: ElementRef) {
  }

  ngOnInit() {
    //TODO retrieve username from state.local.user
  }

  buttonClicked(){
    this.open = !this.open;
    let mainDiv = this.el.nativeElement.querySelector('#main');
    if (this.open) {
      mainDiv.style['width'] = '25%';
    }
    else{
      mainDiv.style.removeProperty('width');
    }
  }

  send() {
    if (this.comment && this.email) {

      let comment = this.comment;
      let email = this.email;
      let items = this.angularFire.database.list('/feedback');
      let headerText = document.body.querySelector('h1:not([style*="display:none"]') ? document.body.querySelector('h1:not([style*="display:none"]').innerHTML : '';
      items.push({
        comment:this.htmlEscape(comment),
        name: this.name,
        email: email,
        timestamp: new Date().toUTCString(),
        href:window.location.href,
        header: headerText
      }).then(x => {
        this.statusMessage = 'Successfully sent';
        setTimeout(() => {
          this.error = false;
          this.statusMessage = '';
          this.open = false;
          let mainDiv = this.el.nativeElement.querySelector('#main');
          mainDiv.style.removeProperty('width');
        }, 2000);
      }).catch(() => {
        this.statusMessage = 'Error while sending feedback';
        this.error = true;
      });

      this.comment = '';
      //TODO set username in state.local.user
    }
  }

  htmlEscape(str) {
    return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
}
