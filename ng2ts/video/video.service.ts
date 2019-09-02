import { Injectable } from '@angular/core';
import { Api } from '../api.service';
/*d:diInjectServiceSolved/trimTrailing*/
@Injectable()
/*/d*//*d:initial*/
export class VideoService {
  search(searchString: string) {
    return Api.fetch(searchString);
  }
}
/*/d*/
