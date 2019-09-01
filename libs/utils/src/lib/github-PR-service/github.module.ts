import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GithubService } from '@codelab/utils';

@NgModule({
  imports: [HttpClientModule],
  providers: [GithubService]
})
export class GithubModule {
}
