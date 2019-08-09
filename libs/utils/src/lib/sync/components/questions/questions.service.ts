import { Injectable } from '@angular/core';
import { filter, first, map, startWith } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';
import produce from 'immer';


export enum QuestionStatus {
  NEW = 'new',
  APPROVED = 'approved',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export interface Question {
  key: string;
  score: number;
  time: number;
  status: QuestionStatus;
  myVote: 1 | 0 | -1;
  author: string;
}


const groupVotesByQuestionId = a => {
  return Object.values(a).reduce((a, r) => Object.entries(r).reduce((a, [key, value]) => {
    a[key] = (a[key] || 0) + value;
    return a;
  }, a), {});
};

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  readonly approvedQuestions$;
  private readonly key = 'qna7';
  private readonly votesKey = 'votes';
  private readonly votes$ = this.syncService.getAllViewersValues(this.votesKey).pipe(
    filter(a => !!a),
    map(groupVotesByQuestionId),
    startWith({})
  );
  private readonly myVotes$ = this.syncService.getCurrentViewerValue(this.votesKey)
    .pipe(
      map(a => a || {})
    );
  private readonly allQuestions$ = this.syncService.getAllViewersValues(this.key)
    .pipe(map(values => {
      return Object.entries(values || {})
        .map(([author, value]) => {
          return Object.entries(value).map(([key, question]) => ({
            ...question,
            author,
            key,
          }));
        })
        .flat();
    }));
  readonly questions$: Observable<Question[]> = combineLatest([this.allQuestions$, this.votes$, this.myVotes$])
    .pipe(map(([questions, votes, myUpvotes]) => {
        return questions.map(q => {
          return ({
            ...q,
            myVote: myUpvotes[q.key],
            score: votes[q.key],
          } as Question);
        });
      }),
      map(questions => questions.sort((a, b) => b.score - a.score)));

  constructor(private readonly syncService: SyncService<any>) {
    // TODO(kirjs): webstorm bug moves it before questions$ when reformatting
    this.approvedQuestions$ = this.questions$.pipe(map(questions => questions.filter(q => q.status === QuestionStatus.APPROVED)));
  }

  add(question: string) {
    this.syncService.pushViewerValue(this.key, {
      question,
      score: 0,
      time: Date.now(),
      status: QuestionStatus.NEW,
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

  updateQuestionStatus(question: Question, status: QuestionStatus) {
    this.syncService.adminModifyViewerValue(this.key, question.author, produce(d => {
        d[question.key].status = status;
      })
    );
  }

  approve(question: Question) {
    this.updateQuestionStatus(question, QuestionStatus.APPROVED);
  }

  unapprove(question: Question) {
    this.updateQuestionStatus(question, QuestionStatus.NEW);
  }
}
