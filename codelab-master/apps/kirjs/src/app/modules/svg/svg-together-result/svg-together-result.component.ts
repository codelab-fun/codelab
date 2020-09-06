import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'kirjs-svg-together-result',
  templateUrl: './svg-together-result.component.html',
  styleUrls: ['./svg-together-result.component.css']
})
export class SvgTogetherResultComponent implements OnInit {
  code = '';
  angularFireList: AngularFireList<any>;
  @Input() fontSize;
  allCode = 'TBD';

  constructor(af: AngularFireDatabase) {
    this.angularFireList = af.list('/svg-together');
    this.angularFireList.snapshotChanges().subscribe(a => {
      this.allCode =
        '<svg viewBox="0 0 500 500">' +
        a.map(a => a.payload.val()).join('\n') +
        '</svg>';
    });
  }

  @Input('code')
  set codeInput(value) {
    this.code = '<svg>\n' + value + '\n</svg>';
  }

  ngOnInit() {}
}
