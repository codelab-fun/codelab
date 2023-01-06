import { Component, OnInit } from '@angular/core';
import { FirebaseInfoService } from '../../services/firebase-info.service';

@Component({
  selector: 'codelab-online-indicator',
  templateUrl: './online-indicator.component.html',
  styleUrls: ['./online-indicator.component.css'],
})
export class OnlineIndicatorComponent implements OnInit {
  constructor(readonly firebaseInfoService: FirebaseInfoService) {}

  ngOnInit() {}
}
