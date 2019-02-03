import { Component, OnDestroy, OnInit } from '@angular/core';
import { LiveService, LiveInfo } from '../live.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'slides-live-mock-component',
  templateUrl: './live-mock.component.html',
  styleUrls: ['./live-mock.component.css']
})
export class LiveMockComponent implements OnInit, OnDestroy {
  data: LiveInfo;

  private subscription: SubscriptionLike;

  constructor(private service: LiveService) { }

  ngOnInit() {
    this.subscription = this.service.data.subscribe((data) => {
      this.data = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
