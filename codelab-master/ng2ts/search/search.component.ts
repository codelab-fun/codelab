import { Component } from '@angular/core';
import { VideoItem } from '../video/video-item';
import { VideoService } from '../video/video.service';

@Component({
  selector: 'slides-search-component',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  videos: VideoItem[] = [];
  title = 'MewTube';

  constructor(public videoService: VideoService) {
    this.search('');
  }

  search(searchString: string) {
    this.videos = this.videoService.search(searchString);
  }
}
