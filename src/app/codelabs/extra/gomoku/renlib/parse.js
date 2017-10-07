// Module import
var Parser = require('binary-parser').Parser;

const header = new Parser()
  .endianess('little')
  .uint8('open', {assert: 255})
  .string('type', {
    length: 6,
    assert: 'RenLib'
  })
  .uint8('open', {assert: 255})
  .int8('major', {assert: 3})
  .int8('minor')
  .skip(10)
  .int8('who')
  .int8('marker')
  .array('welcome',{
    type: 'uint8',
    readUntil: function(a, b){
      return b.readUInt16LE() === 0;
    },
    formatter: function(a){
      return a.map(v=>String.fromCharCode(parseInt(v,10).toString(10))).join('');
    }
  })
  .skip(2)
  .array('moves',{
    type: 'uint8',
    length: 30,
  });



/*
const comment = new Parser().string({
  length: 10
});

const part = new Parser()
  .int8('marker')
  .choice('part',{
    tag: 'marker',
    choices: {
      32: comment
    }
  })
;
*/

p = new Parser()
  .nest('header', {
    type: header
  });

//console.log(require('fs').readFileSync('i7.lib', 'UTF-8'));
require('fs').readFile('i7.lib', function (err, data) {

  const v = p.parse(data);
  console.log(JSON.stringify(v));
});
