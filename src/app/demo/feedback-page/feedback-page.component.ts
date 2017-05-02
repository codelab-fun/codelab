import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Message} from "../../feedback/message";

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent {
  constructor(private database: AngularFireDatabase) {
  }
  rawFeedbackList: Array<any> = [];
  currentFeedbackList: Message[] = [];
  dates: Array<string> = [''];
  selectedDate = '';
  feedbackersCount = {};
  feedbackersNames = [];


  ngOnInit() {
    this.database.list('/feedback').subscribe(list => {
      this.feedbackersCount = {};
      this.feedbackersNames = [];
      list.forEach((val) => {
        this.feedbackersCount[val.name] = this.feedbackersCount[val.name] ? this.feedbackersCount[val.name] + 1 : 1;
      });
      this.feedbackersNames = Object.keys(this.feedbackersCount);
      this.feedbackersNames.sort((a,b) => {
        return this.feedbackersCount[b] - this.feedbackersCount[a];
      });
      this.rawFeedbackList = list;
      this.currentFeedbackList = this.rawFeedbackList;
    });
  }

  isDone(eleKey: any, event): void{
    this.database.object('/feedback/'+eleKey).update({
      isDone: event.target.checked
    });
  }

  isShown = (isDone) => {
    return true;
  };

  onFilterChange(event: any): void{
    const value = event.target.value;
    if (value == 'Done') {
      this.isShown = (isDone)=> {
        return isDone;
      };
    }
    if(value == 'All') {
      this.isShown = (isDone) => {
        return true;
      };
    }
    if (value == 'Undone') {
      this.isShown = (isDone) => {
        return !isDone;
      };
    }
  }
}
