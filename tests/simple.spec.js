import chai, {expect} from 'chai';
import toDelta from '../src/toDelta';

describe('toDelta', () => {
  it('converts text with emphasis', () => {
    const input = 'Hello *world*';
    const expected = [{ insert: 'Hello '}, { insert: 'world', attributes: { "italic": true } }, { "insert": "\n" }];

    var result = toDelta(input);

    expect(result).to.deep.equal(expected);
  });

  it('converts text with strong', () => {
    const input = 'Hello **world**';
    const expected = [{ insert: 'Hello '}, { insert: 'world', attributes: { "bold": true } }, { "insert": "\n" }];

    var result = toDelta(input);

    expect(result).to.deep.equal(expected);
  });


  it('converts text with link', () => {
    const input = 'Hello [world](url)';
    const expected = [{ insert: 'Hello '}, { insert: 'world', attributes: { "link": 'url' } }, { "insert": "\n" }];

    var result = toDelta(input);

    expect(result).to.deep.equal(expected);
  });
});
