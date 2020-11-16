import { TestBed } from '@angular/core/testing';
import { calculateUserScore } from '@codelab/utils/src/lib/sync/components/poll/common/sync-poll.service';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';

describe('SyncPoll', () => {
  const userData = {
    // Dog is the only one right.
    dogIsRight: {
      dog: { answer: 0, time: 102 },
      cat: { answer: 1, time: 100 },
      pikachu: { answer: 1, time: 100 },
      mouse: { answer: 1, time: 100 }
    },
    catIsRightImmediately: {
      dog: { answer: 0, time: 104 },
      cat: { answer: 1, time: 100 },
      pikachu: { answer: 2, time: 100 }
    },
    catAndDogAreRightImmediately: {
      dog: { answer: 1, time: 100 },
      cat: { answer: 1, time: 100 },
      pikachu: { answer: 2, time: 100 }
    },
    catAndDogAreRightAtTheSameTime: {
      dog: { answer: 1, time: 120 },
      cat: { answer: 1, time: 120 },
      pikachu: { answer: 2, time: 100 }
    },
    catAndDogAreRightAtCatIsFaster: {
      dog: { answer: 1, time: 120 },
      cat: { answer: 1, time: 110 },
      pikachu: { answer: 2, time: 100 }
    },
    everyoneIsRight: {
      dog: { answer: 1, time: 101 },
      cat: { answer: 1, time: 103 },
      pikachu: { answer: 1, time: 105 }
    },
    outsideOfRange: {
      dog: { answer: 1, time: 30 },
      cat: { answer: 1, time: 25000 },
      pikachu: { answer: 1, time: 99 },
      mouse: { answer: 1, time: 121 }
    }
  };

  const testConfig: SyncPollConfig[] = [
    {
      key: 'a',
      type: 'choice',
      question: 'A???',
      answer: 'correct',
      options: ['correct', 'b', 'c', 'd']
    },
    {
      key: 'b',
      type: 'choice',
      question: 'B??',
      answer: 'correct',
      options: ['a', 'correct', 'c', 'd']
    },
    {
      key: 'c',
      type: 'choice',
      question: 'C???',
      answer: 'correct',
      options: ['a', 'b', 'correct', 'd']
    },
    {
      key: 'c',
      type: 'choice',
      question: 'I do not have an answer',
      options: ['a', 'b', 'correct', 'd']
    }
  ];

  const presenterData = {
    a: { startTime: 100 },
    b: { startTime: 100 },
    c: { startTime: 100 },
    d: { startTime: 100 }
  };

  beforeEach(() => TestBed.configureTestingModule({}));

  describe('calculateUserScore', () => {
    it('gracefully handles the case where presented data has a key that presenters data does not have', () => {
      const v = calculateUserScore(testConfig, presenterData, { goodKey: {} });
      expect(v).toEqual({});
    });

    it('handles simple case when the first user is right', () => {
      const v = calculateUserScore(testConfig, presenterData, {
        a: userData.dogIsRight
      });
      expect(v).toEqual({ dog: 100, cat: 0, pikachu: 0, mouse: 0 });
    });

    it('handles simple case when the second user is right immideately', () => {
      const v = calculateUserScore(testConfig, presenterData, {
        b: userData.catIsRightImmediately
      });
      expect(v).toEqual({ dog: 0, cat: 100, pikachu: 0 });
    });

    it('two users gave correct answer immediately', () => {
      const v = calculateUserScore(testConfig, presenterData, {
        b: userData.catAndDogAreRightImmediately
      });
      expect(v).toEqual({ dog: 100, cat: 100, pikachu: 0 });
    });

    it('second user gave correct answer at the same time', () => {
      const v = calculateUserScore(testConfig, presenterData, {
        b: userData.catAndDogAreRightAtTheSameTime
      });
      expect(v).toEqual({ dog: 100, cat: 100, pikachu: 0 });
    });

    it('2 users gave correct answer, but cat was faster', () => {
      const v = calculateUserScore(testConfig, presenterData, {
        b: userData.everyoneIsRight
      });
      expect(v).toEqual({ dog: 100, cat: 75, pikachu: 50 });
    });

    it('Multiple questions', () => {
      const v = calculateUserScore(testConfig, presenterData, {
        a: userData.dogIsRight,
        b: userData.everyoneIsRight
      });
      expect(v).toEqual({
        mouse: 0,
        dog: 200,
        cat: 75,
        pikachu: 50
      });
    });

    it('Ignores answers that are outside of the range', () => {
      const v = calculateUserScore(testConfig, presenterData, {
        b: userData.outsideOfRange
      });
      expect(v).toEqual({ dog: 0, cat: 0, pikachu: 0, mouse: 100 });
    });
  });
});
