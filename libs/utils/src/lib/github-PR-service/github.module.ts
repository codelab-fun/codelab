import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GithubService } from './github.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [GithubService]
})
export class GithubModule {}
