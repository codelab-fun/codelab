import {Component, OnInit, ComponentFactoryResolver} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  activeSlideId = 0;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    if (id) {
      this.activeSlideId = id;
    }
  }
}
