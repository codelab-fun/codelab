import { evalJs, FuzzyPipe } from '../fuzzy-pipe/fuzzy.pipe';
import 'reflect-metadata';

let metadata;
beforeEach(() => {
  try {
    metadata = FuzzyPipe['__annotations__'][0];
  } catch (e) {
  }
});

const d = new Date();
d.setDate(d.getDate() - 2);
const formattedDate = d.toISOString().slice(0, 10);


describe('Pipe', () => {
  it(`Create a class called FuzzyPipe`, () => {
    chai.expect(typeof evalJs('FuzzyPipe')).equals('function');
  });

  it(`Export it`, () => {
    chai.expect(typeof FuzzyPipe).equals('function');
  });

  it(`Add a @Pipe() decorator`, () => {
    chai.expect(metadata).is.an('array')
  });

  it(`Set the name to fuzzy`, () => {
    chai.expect(metadata.name).equals('fuzzy');
  });

  it(`Make it return '2 days ago for '${formattedDate}'`, () => {
    let fuzzyTime = new FuzzyPipe();
    chai.expect(fuzzyTime.transform(d.toISOString().slice(0, 10)).toLowerCase()).equals('2 ' + 'days');
  });
});

