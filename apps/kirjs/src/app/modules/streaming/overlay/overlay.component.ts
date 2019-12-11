import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slides-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {
  config = {
    url: 'twitch.tv/kirjs',
    topic: 'Topic of the day: lol',
    guests: [
      {
        name: '🦊',
        twitter: 'thekiba_io',
        avatar:
          'https://pbs.twimg.com/profile_images/668060945998938112/5o017-qp_400x400.jpg'
      },
      {
        name: 'kirjs',
        twitter: 'kirjs',
        avatar:
          'https://pbs.twimg.com/profile_images/869618855055839232/jqbSOmRU_400x400.jpg'
      }
    ]
  };

  constructor() {}

  ngOnInit() {}
}
