import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import produce from 'immer';
import {
  Question,
  QuestionDb,
  QuestionStatus
} from '@codelab/utils/src/lib/sync/components/questions/common/common';
import { SyncDataService } from '@codelab/utils/src/lib/sync/services/sync-data.service';
import { SyncRegistrationService } from '@codelab/utils/src/lib/sync/components/registration/sync-registration.service';

const groupVotesByQuestionId = a => {
  return Object.values(a).reduce(
    (a, r) =>
      Object.entries(r).reduce((a, [key, value]) => {
        a[key] = (a[key] || 0) + value;
        return a;
      }, a),
    {}
  );
};

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  readonly key = 'qna7';

  readonly presenterObject = this.syncDataService
    .getPresenterObject(this.key)
    .withDefault({
      requireApproval: true,
      starredQuestionKey: null
    });

  readonly requireApproval$ = this.presenterObject
    .valueChanges()
    .pipe(map(a => a.requireApproval));

  private readonly questionsObject = this.syncDataService
    .getAdminAllUserData(this.key)
    .withDefault({});

  public readonly allQuestions$ = this.questionsObject.valueChanges().pipe(
    map(values => {
      return Object.entries(values || {})
        .map(([author, value]) => {
          return Object.entries(value.questions).map(([key, question]) => ({
            ...question,
            author,
            key
          }));
        })
        .flat();
    })
  );

  private readonly starredQuestionKeyData = this.presenterObject.object(
    'starredQuestionKey'
  );

  private readonly votesKey = 'votes';

  private readonly votes$ = this.syncDataService
    .getAdminAllUserData(this.votesKey)
    .withDefault({})
    .valueChanges()
    .pipe(map(groupVotesByQuestionId));

  private readonly myQuestionsList = this.syncDataService
    .getCurrentViewerObject(this.key)
    .list('questions');

  readonly myUnapprovedQuestions$ = this.myQuestionsList
    .valueChanges()
    .pipe(
      map((questions: QuestionDb) =>
        Object.values(questions).filter(
          a => a.status !== QuestionStatus.APPROVED
        )
      )
    );
  private readonly myVotesObject = this.syncDataService
    .getCurrentViewerObject(this.votesKey)
    .withDefault({});

  readonly questions$: Observable<Question[]> = combineLatest([
    this.allQuestions$,
    this.votes$,
    this.myVotesObject.valueChanges(),
    this.starredQuestionKeyData.valueChanges(),
    this.presenterObject.valueChanges(),
    this.registrationService.usersMap$
  ]).pipe(
    map(
      ([
        questions,
        votes,
        myVotes,
        starredQuestionKey,
        presenterData,
        usersMap
      ]) => {
        return questions.map(q => {
          const status = q.status;
          return {
            ...q,
            displayName: usersMap[q.author],
            myVote: myVotes[q.key],
            score: votes[q.key] || 0,
            starred: starredQuestionKey === q.key,
            public: presenterData.requireApproval
              ? status === QuestionStatus.APPROVED
              : status === QuestionStatus.APPROVED ||
                status === QuestionStatus.NEW
          } as Question;
        });
      }
    ),
    map(questions => {
      return questions.sort((a, b) => b.score - a.score || a.time - b.time);
    })
  );

  publicQuestions$ = this.questions$.pipe(
    map(questions => questions.filter(q => q.public))
  );

  starredQuestion$ = combineLatest([
    this.starredQuestionKeyData.valueChanges(),
    this.questions$
  ]).pipe(
    map(([starredQuestionKey, questions]) => {
      return starredQuestionKey
        ? questions.find(q => q.key === starredQuestionKey)
        : null;
    })
  );

  constructor(
    private readonly syncDataService: SyncDataService,
    private readonly registrationService: SyncRegistrationService
  ) {}

  addQuestion(question: string) {
    this.myQuestionsList.push({
      question,
      score: 0,
      time: Date.now(),
      status: QuestionStatus.NEW
    });
  }

  setVote(key: string, score: number) {
    this.myVotesObject.updateWithCallback(
      produce(upvotes => {
        upvotes[key] = upvotes[key] === score ? 0 : score;
      })
    );
  }

  updateQuestionStatus(question: Question, status: QuestionStatus) {
    this.syncDataService
      .getViewerObject(this.key, question.author)
      .withDefault({})
      .updateWithCallback(a => {
        a.questions[question.key].status = status;
        return a;
      });
  }

  starQuestion(starredQuestionKey: string) {
    this.starredQuestionKeyData.set(starredQuestionKey);
  }
}
