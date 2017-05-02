import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Message } from "../../feedback/message";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { combineLatest } from "rxjs/observable/combineLatest";
import 'rxjs/add/operator/map'
import { Observable } from "rxjs/Observable";

type Filter = 'all'|'done'|'notDone';
type Grouping = 'nothing'|'href'|'name';

 function groupBy(feedback: Array<Message>, grouping: Grouping){
      const result =  feedback.reduce((result, item)=>{
        const group = item[grouping];
        result[group] = result[group] || [];
        result[group].push(item);        
        return result;
      }, {});

      return Object.keys(result).map(key=>({key, value: result[key]}));
   }

function  group([feedback, grouping]){
    if(grouping==='nothing'){
      return [{
        key: 'Messages',
        value: feedback
      }]
    }
    if( grouping === 'name' || grouping === 'href'){
      return groupBy(feedback, grouping);
    }
    throw new Error('Unknown grouping: ' + grouping);    
  }

  function filter([feedback, filter]){
    if(filter === 'all'){
      return feedback;
    }

    if(filter === 'done'){
      return feedback.filter(message=>message.isDone);
    }

    if(filter === 'notDone'){
      return feedback.filter(message=>!message.isDone);
    }
  }

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent {
  messages$: Observable<{ key: string; value: Message; }[]>;
  filter$ = new BehaviorSubject<Filter>('notDone');
  group$ = new BehaviorSubject<Grouping>('href');

  constructor(private database: AngularFireDatabase) {
  }
  
  rawFeedbackList: Array<any> = [];
  currentFeedbackList: Message[] = [];
  dates: Array<string> = [''];
  selectedDate = '';
  feedbackersCount = {};
  feedbackersNames = [];




  

  ngOnInit() {
   const feedback$ = this.database.list('/feedback');
   const filteredMessages$ = combineLatest(feedback$, this.filter$).map(filter);   
   this.messages$ = combineLatest(filteredMessages$, this.group$).map(group)  
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
