import { Component, OnInit } from '@angular/core';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';
import { filter, first, map, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

const groupVotesByQuestionId = a => {
  return Object.values(a).reduce((a, r) => Object.entries(r).reduce((a, [key, value]) => {
    a[key] = (a[key] || 0) + value;
    return a;
  }, a), {});
};

@Component({
  selector: 'slides-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private readonly key = 'qna7';
  private readonly votesKey = 'votes';

  private readonly votes$ = this.syncService.getAllViewersValues(this.votesKey).pipe(
    filter(a => !!a),
    map(groupVotesByQuestionId),
    startWith({})
  );


  private readonly myVotes$ = this.syncService.getViewerValue(this.votesKey)
    .pipe(
      map(a => a || {})
    );

  private readonly allQuestions$ = this.syncService.getAllViewersValues(this.key)
    .pipe(map(values => {
      // @ts-ignore
      return Object.entries(values || {})
        .map(([key, value]) => {
          return Object.entries(value).map(([author, question]) => ({
            ...question,
            author,
            key,
          }));
        })
        .flat();
    }));

  readonly questions$ = combineLatest([this.allQuestions$, this.votes$, this.myVotes$])
    .pipe(map(([questions, votes, myUpvotes]) => {
        return questions.map(q => {
          return ({
            ...q,
            myVote: myUpvotes[q.key],
            score: votes[q.key],
          });
        });
      }),
      map(questions => questions.sort((a, b) => b.score - a.score)));


  constructor(private readonly syncService: SyncService<any>) {
  }

  ngOnInit() {
  }

  add(question: string) {
    this.syncService.pushViewerValue(this.key, {
      question,
      score: 0,
      time: Date.now(),
      upvotes: {}
    });
  }

  setVote(key: string, score: number) {
    this.myVotes$.pipe(
      map(upvotes => {
        if (upvotes[key] === score) {
          score = 0;
        }
        return ({...upvotes, [key]: score});
      }),
      first(),
    ).subscribe(update => {
      this.syncService.updateViewerValue(this.votesKey, update);
    });
  }
}
