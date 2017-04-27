import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PresentationComponent } from './../presentation/presentation.component';
import { PresentationMode } from './../presentation-mode.enum';
import { SlideComponent } from './../slide/slide.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor(
    private presentation:PresentationComponent,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
        this.presentation.mode = Number(params['mode']);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  toggle(value:boolean){
      const queryParams = { mode: value ? PresentationMode.overview : null };
      this.router.navigate([],
        {
          relativeTo: this.route,
          queryParams
        });
  }

  print() {
    window.print();
  }
}
