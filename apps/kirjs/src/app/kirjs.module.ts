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
    name: 'Image inclusion',
    description: 'Image inclusion',
  },
  {
    path: 'ii',
    loadChildren: './modules/ii/ii.module#IiModule',
    name: 'Image inclusion',
    description: 'Image inclusion',
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
    }
  ],
  bootstrap: [AppComponent]
})
export class KirjsModule {
}
