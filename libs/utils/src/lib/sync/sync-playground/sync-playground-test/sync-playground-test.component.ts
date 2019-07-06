import { Component, OnInit } from '@angular/core';
import { LoginService } from '@codelab/firebase-login';

@Component({
  selector: 'slides-sync-playground-test',
  templateUrl: './sync-playground-test.component.html',
  styleUrls: ['./sync-playground-test.component.css']
})
export class SyncPlaygroundTestComponent implements OnInit {

  constructor(readonly loginService: LoginService) { }

  ngOnInit() {
  }

}
