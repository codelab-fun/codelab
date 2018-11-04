import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { monacoReady } from '../../../angular-presentation/src/app/codelabs/codelabs.module';

const routes = [
  {
    path: 'binary',
    loadChildren: './modules/binary/binary.module#BinaryModule',
    name: 'Binary',
    description: 'Learn about Binary in JS',
    page: 'bonus',
    prod: true
  },
  {
    path: 'cellular-automation',
    loadChildren: './modules/cellular-automation/cellular-automation.module#CellularAutomationModule',
    name: 'Image inclusion',
    description: 'Image inclusion',
  },
  {
    path: 'feedback-page',
    loadChildren: './modules/feedback-page/feedback-page.module#FeedbackPageModule',
    name: 'Feedback page',
    description: 'Feedback page',
  },
  {
    path: 'ii',
    loadChildren: './modules/ii/ii.module#IiModule',
    name: 'Image inclusion',
    description: 'Image inclusion',
  }, {
    path: 'music',
    loadChildren: './modules/music/music.module#MusicModule',
    name: 'Music',
    description: 'Musicja',
  },
  {
    path: 'react',
    loadChildren: './modules/react/react.module#ReactModule',
    name: 'React',
    description: 'React',
  },
  {
    path: 'svg',
    loadChildren: './modules/svg/svg.module#SvgModule',
    name: 'Svg + Angular',
    description: 'SVG ',
  },
  {
    path: 'ast',
    loadChildren: './modules/ast/ast.module#AstModule',
    name: 'Ast + Angular',
    description: 'SVG ',
  },
  {
    path: '',
    loadChildren: './modules/home/home.module#HomeModule',
    name: 'Home',
    description: 'Home',
  },
  {
    path: 'test',
    loadChildren: './modules/test/test.module#TestModule',
    name: 'Home',
    description: 'Home',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useValue: monacoReady,
      multi: true
    },
    {
      provide: 'ROUTES',
      useValue: []
    },
  ],
  bootstrap: [AppComponent]
})
export class KirjsModule {
}
