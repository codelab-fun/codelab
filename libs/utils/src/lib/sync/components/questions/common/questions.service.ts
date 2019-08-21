import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import produce from 'immer';
import {
  Question,
  QuestionConfig,
  QuestionDb,
  QuestionStatus,
  UserVotes
} from '@codelab/utils/src/lib/sync/components/questions/common/common';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';


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
  readonly publicQuestions$;
  readonly starredQuestion$;
  readonly key = 'qna7';

  readonly presenterObject = this.syncDataService.getPresenterObject<QuestionConfig>(this.key, {
    requireApproval: true,
    starredQuestionKey: null
  });

  readonly requireApproval$ = this.presenterObject.valueChanges().pipe(map(a => a.requireApproval));
  private readonly questionsObject = this.syncDataService.getAdminAllUserData(this.key, {});
  public readonly allQuestions$ = this.questionsObject
    .valueChanges()
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

  private readonly starredQuestionKeyData = this.presenterObject.object('starredQuestionKey');

  private readonly votesKey = 'votes';

  private readonly votes$ = this.syncDataService
    .getAdminAllUserData(this.votesKey, {})
    .valueChanges()
    .pipe(map(groupVotesByQuestionId));

  private readonly myQuestionsList = this.syncDataService.getCurrentViewerList<QuestionDb>(this.key);
  readonly myUnapprovedQuestions$ = this.myQuestionsList.valueChanges().pipe(map(questions =>
    Object.values(questions).filter(a => a.status !== QuestionStatus.APPROVED)
  ));
  private readonly myVotesObject = this.syncDataService.getCurrentViewerObject<UserVotes>(this.votesKey, {});
  readonly questions$: Observable<Question[]> = combineLatest([
    this.allQuestions$,
    this.votes$,
    this.myVotesObject.valueChanges(),
    this.starredQuestionKeyData.valueChanges(),
    this.presenterObject.valueChanges()
  ])
    .pipe(map(([
                 questions,
                 votes,
                 myVotes,
                 starredQuestionKey,
                 presenterData,
               ]) => {
        return questions.map(q => {
          const status = (q as any).status;
          return ({
            ...q,
            myVote: myVotes[q.key],
            score: votes[q.key] || 0,
            starred: starredQuestionKey === q.key,
            public: presenterData.requireApproval ?
              status === QuestionStatus.APPROVED :
              (status === QuestionStatus.APPROVED || status === QuestionStatus.NEW)
          } as Question);
        });
      }),
      map(questions => {
        return questions.sort((a, b) => b.score - a.score || a.time - b.time);
      }),
    );


  constructor(private readonly syncDataService: SyncDataService) {
    // TODO(kirjs): webstorm bug moves it before questions$ when reformatting
    this.publicQuestions$ = this.questions$.pipe(map(questions => questions.filter(q => q.public)));

    this.starredQuestion$ = combineLatest([
      this.starredQuestionKeyData.valueChanges(),
      this.questions$
    ]).pipe(map(([starredQuestionKey, questions]) => {
        return starredQuestionKey ? questions.find((q) => q.key === starredQuestionKey) : null;
      }
    ));
  }

  addQuestion(question: string) {
    this.myQuestionsList.push({
      question,
      score: 0,
      time: Date.now(),
      status: QuestionStatus.NEW,
    });
  }

  setVote(key: string, score: number) {
    this.myVotesObject.updateWithCallback(produce((upvotes) => {
      upvotes[key] = (upvotes[key] === score) ? 0 : score;
    }));
  }

  updateQuestionStatus(question: Question, status: QuestionStatus) {
    const x = this.syncDataService.getViewerObject(this.key, question.author, {});
    this.syncDataService.getViewerObject(this.key, question.author, {}).updateWithCallback(a => {
      a[question.key].status = status;
      return a;
    });
  }

  approve(question: Question) {
    this.updateQuestionStatus(question, QuestionStatus.APPROVED);
  }

  starQuestion(starredQuestionKey: string) {
    this.starredQuestionKeyData.set(starredQuestionKey);
  }

  updateRequiresApproval(requireApproval: boolean) {
    this.presenterObject.object('requireApproval').set(requireApproval);
  }
}
