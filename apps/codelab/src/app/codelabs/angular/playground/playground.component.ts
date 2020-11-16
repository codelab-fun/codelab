import { Component } from '@angular/core';
import { angularSampleCode } from './angular-sample';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'codelab-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent {
  code = angularSampleCode;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    const code = activatedRoute.snapshot.queryParams.code;
    if (code) {
      try {
        this.code = { ...angularSampleCode, ...JSON.parse(atob(code)) };
      } catch (e) {
        console.log('can not parse code', code);
      }
    }
  }

  handleUpdate(code: any) {
    const encoded = btoa(JSON.stringify(code));
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { code: encoded }
    });
  }
}
