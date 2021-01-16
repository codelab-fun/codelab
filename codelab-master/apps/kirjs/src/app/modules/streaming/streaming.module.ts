import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayComponent } from './overlay/overlay.component';

import firebase from 'firebase/app';
// Add additional services that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import flamelink from 'flamelink/app';
// Add additional modules that you want to use
import 'flamelink/content';
import 'flamelink/storage';
import { FLAME_LINK } from './common';
import { MarkdownModule } from 'ngx-markdown';

const firebaseConfig = {
  apiKey: 'AIzaSyC_Zyq9Ve1SrbenuN0iDlDd4hQvTIlruP8',
  authDomain: 'kirjs-c884f.firebaseapp.com',
  databaseURL: 'https://kirjs-c884f.firebaseio.com',
  projectId: 'kirjs-c884f',
  storageBucket: 'kirjs-c884f.appspot.com',
  messagingSenderId: '651206687896',
  appId: '1:651206687896:web:3df45fa9e636bb5882a4ed',
  measurementId: 'G-3B7YEC4QG7'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const app = flamelink({
  firebaseApp,
  env: 'production', // optional, defaults to `production`
  locale: 'en-US', // optional, defaults to `en-US`
  dbType: 'cf' // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Realtime DB vs Cloud Firestore)
});

@NgModule({
  declarations: [],
  providers: [
    {
      provide: FLAME_LINK,
      useValue: app
    }
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OverlayComponent
      }
    ]),
    CommonModule,
    MarkdownModule
  ]
})
export class StreamingModule {}
