import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent {
  constructor(private database: AngularFireDatabase) {
  }
  rawFeedbackList: Array<any> = [];
  currentFeedbackList = [];
  dates: Array<string> = [''];
  selectedDate = '';
  feedbackersCount = {};
  feedbackersNames = [];

  ngOnInit() {

    this.database.list('/feedback').subscribe(list => {
      this.feedbackersCount = {};
      this.feedbackersNames = [];
      list.forEach((val, ind) => {
        if (typeof val.state === 'string') {
          val.state = JSON.parse(val.state);
        }
        let stringDate = new Date(val.timestamp).toDateString();
        if (this.dates.indexOf(stringDate) < 0) {
          this.dates.push(stringDate);
        }

        this.feedbackersCount[val.name] = this.feedbackersCount[val.name] ? this.feedbackersCount[val.name] + 1 : 1;
      });
      this.feedbackersNames = Object.keys(this.feedbackersCount);
      this.feedbackersNames.sort((a,b) => {
        return this.feedbackersCount[b] - this.feedbackersCount[a];
      });
      this.rawFeedbackList = list;
      this.currentFeedbackList = this.rawFeedbackList;
      this.filterByDate(this.selectedDate);
    });
  }

  filterByDate(date: string) {
    this.selectedDate = date;
    this.currentFeedbackList = date ? this.rawFeedbackList.filter(x => new Date(x.timestamp).toDateString() === date) : this.rawFeedbackList;
  }

  simulateFeedback(id) {
    var win = window.open(window.location.origin + '/#simulate=' + id, '_blank');
    win.focus();
  }

}
