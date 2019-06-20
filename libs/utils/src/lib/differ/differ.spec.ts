import { differ } from './differ';

describe('differ', () => {
  it('returns the text the way it is, if there are no special tags.', () => {
    const commits = differ('hi', ['first', 'second']);
    expect(commits['initial']).toEqual('hi');
    expect(commits['first']).toEqual('hi');
    expect(commits['second']).toEqual('hi');
  });

  it('Progressively adds the text for a single commit.', () => {
    const commits = differ('hi/*Sd:first*/, world!/*/d*/', ['first']);
    expect(commits['initial']).toEqual('hi');
    expect(commits['first']).toEqual('hi, world!');
  });

  it('Works for multiline strings', () => {
    const commits = differ(
      `hi/*d:first*/, wor
  ld!/*/d*/`,
      ['first']
    );
    expect(commits['initial']).toEqual('hi');
    expect(commits['first']).toEqual(`hi, wor
  ld!`);
  });

  it('Progressively adds the text for multiple commits.', () => {
    const commits = differ(
      `/*d:first*/bu/*/d*//*d:second*/ra/*/d*//*d:third*/ti/*/d*//*d:forth*/no/*/d*/`,
      ['first', 'second', 'third', 'forth']
    );
    expect(commits['initial']).toEqual('');
    expect(commits['first']).toEqual('bu');
    expect(commits['second']).toEqual('bura');
    expect(commits['third']).toEqual('burati');
    expect(commits['forth']).toEqual('buratino');
  });

  // TODO(kirjs): Nested diffs sound like a fun idea, maybe I'll implement them later.
  xit('Disallows nested diffs, and throws if they are present', () => {
    const commits = differ(`/*d:first*/AA/*d:second*/OO/*/d*/AA/*/d*/`, [
      'first',
      'second'
    ]);
    expect(commits['initial']).toEqual('');
    expect(commits['first']).toEqual('AAAA');
    expect(commits['second']).toEqual('AAOOAA');
  });

  it('Throws if not all commits have been used.', () => {
    expect(() =>
      differ(`/*d:first*/AAOO/*/d*/OO/*d:second*/AA/*/d*/`, ['first'])
    ).toThrow();
  });

  it('Allows multi-line tags for nicer formatting', () => {
    const commits = differ(
      `hi/*
    d:first
    */, world!/*/d*/`,
      ['first']
    );
    expect(commits['initial']).toEqual('hi');
    expect(commits['first']).toEqual('hi, world!');
  });

  it('Allows to specify a range of commits.', () => {
    const commits = differ(
      `/*d:first*/bu/*/d*//*d:second:second*/ra/*/d*//*d:third*/ti/*/d*//*d:forth*/no/*/d*/`,
      ['first', 'second', 'third', 'forth']
    );
    expect(commits['initial']).toEqual('');
    expect(commits['first']).toEqual('bu');
    expect(commits['second']).toEqual('bura');
    expect(commits['third']).toEqual('buti');
    expect(commits['forth']).toEqual('butino');
  });

  it('Allows to specify a range of commits for initial', () => {
    const commits = differ(`/*d:initial:initial*/hi/*/d*//*d:last*/bye/*/d*/`, [
      'first',
      'second',
      'third',
      'last'
    ]);
    expect(commits['initial']).toEqual('hi');
    expect(commits['second']).toEqual('');
    expect(commits['third']).toEqual('');
    expect(commits['last']).toEqual('bye');
  });

  it('Allows to specify a wider range of commits.', () => {
    const commits = differ(
      `/*d:first*/bu/*/d*//*d:second:third*/ra/*/d*//*d:third*/ti/*/d*//*d:forth*/no/*/d*/`,
      ['first', 'second', 'third', 'forth']
    );
    expect(commits['initial']).toEqual('');
    expect(commits['first']).toEqual('bu');
    expect(commits['second']).toEqual('bura');
    expect(commits['third']).toEqual('burati');
    expect(commits['forth']).toEqual('butino');
  });

  it('Keeps existing version for the unknown commits.', () => {
    const commits = differ(
      `/*d:first*/bu/*/d*//*d:second:third*/ra/*/d*//*d:third*/ti/*/d*//*d:forth*/no/*/d*/`,
      ['first', 'second', 'secondandahalf', 'third', 'forth']
    );
    expect(commits['initial']).toEqual('');
    expect(commits['first']).toEqual('bu');
    expect(commits['second']).toEqual('bura');
    expect(commits['secondandahalf']).toEqual('bura');
    expect(commits['third']).toEqual('burati');
    expect(commits['forth']).toEqual('butino');
  });
});
