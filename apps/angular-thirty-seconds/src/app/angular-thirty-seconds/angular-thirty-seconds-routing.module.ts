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
class SnippetsResolver implements Resolve<Observable<any>> {
  resolve() {
    return from(fetch('https://gitcdn.link/repo/nycJSorg/30-seconds-of-angular/master/data/data.json')
      .then(data => data.json())
    );
  }
}

const routes = RouterModule.forChild(
  [
    {path: 'new', component: CreateSnippetComponent},
    {path: '', component: SnippetListComponent, resolve: {snippets: SnippetsResolver}},
    {path: 'list', component: SnippetListComponent, resolve: {snippets: SnippetsResolver}},
    {path: ':id', component: SnippetComponent, resolve: {snippets: SnippetsResolver}},
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


