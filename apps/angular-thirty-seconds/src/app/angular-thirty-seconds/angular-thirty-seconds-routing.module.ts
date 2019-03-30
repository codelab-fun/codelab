import { Injectable, NgModule } from '@angular/core';
import { Resolve, RouterModule } from '@angular/router';
import { CreateSnippetComponent } from './create-snippet/create-snippet.component';
import { SnippetListComponent } from './snippet-list/snippet-list.component';
import { from, Observable } from 'rxjs';
import { SnippetListModule } from './snippet-list/snippet-list.module';
import { SnippetComponent } from './snippet/snippet.component';

@Injectable({
  providedIn: 'root'
})
export class SnippetsResolver implements Resolve<Observable<any>> {
  resolve(a) {
    return from(fetch('https://gitcdn.xyz/repo/nycJSorg/30-seconds-of-angular/master/data/data.json')
      .then(data => data.json())
      .then(data => data.map(item => {
        item.tags.push(item.level);
        return item;
      }))
    );
  }
}

const routes = RouterModule.forChild(
  [
    {path: 'new', component: CreateSnippetComponent},
    {
      path: '',
      resolve: {snippets: SnippetsResolver},
      children: [
        {path: '', component: SnippetListComponent},
        {path: 'list', component: SnippetListComponent},
        {path: 'tag/:tag', component: SnippetListComponent},
        {path: ':id', component: SnippetComponent},
      ],
    },
  ]
);

@NgModule({
  imports: [
    routes,
    SnippetListModule,
  ],
  exports: [RouterModule]
})

export class AngularThirtySecondsRoutingModule {
}


