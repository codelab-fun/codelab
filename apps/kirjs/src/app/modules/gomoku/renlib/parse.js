// Module import
const fs = require('fs');
const Parser = require('binary-parser').Parser;

const readComment = Parser.start()
  .array('comment', {
    type: 'uint8',
    readUntil: function(a, b) {
      return b.readUInt16LE() === 0 || b.length < 3;
    },
    formatter: function(a) {
      return a
        .map(v => String.fromCharCode(parseInt(v, 10).toString(10)))
        .join('');
    }
  })
  .skip(2);

const readMove = Parser.start()
  .uint8('move', {
    formatter: flag => [(flag % 16) - 1, Math.ceil(flag / 16) - 1]
  })
  .bit1('down') // 128  Has Siblings
  .bit1('right') // 64 Has a child node, into the subtree
  .bit1('hz4')
  .bit1('mark')
  .bit1('hasComment')
  .bit1('hz2')
  .bit1('hz1')
  .bit1('extension')
  .choice('comment', {
    tag: 'hasComment',
    choices: {
      0: Parser.start(),
      1: readComment
    }
  });

const header = Parser.start()
  .endianess('little')
  .uint8('open', { assert: 255 })
  .string('type', {
    length: 6,
    assert: 'RenLib'
  })
  .uint8('open', { assert: 255 })
  .int8('major', { assert: 3 })
  .int8('minor')
  .skip(10);

p = new Parser()
  .nest('header', {
    type: header
  })
  .array('moves', {
    type: readMove,
    readUntil: 'eof'
  });

require('fs').readFile('ss.lib', function(err, data) {
  const v = p.parse(data);
  console.log(JSON.stringify(v));
  fs.writeFileSync('moves.json', JSON.stringify(v), 'UTF-8');
});
