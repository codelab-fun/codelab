const Bot = require('slackbots');
const http = require('http');

const settings = {
  token: 'xoxb-316671962772-gGfndm4ktPYnnZs9Z1Fv0N1k',
  name: 'regex_battle'
};

const channel = 'regex_battle_test';

const bot = new Bot(settings);

bot.on('start', () => {
  bot.postMessageToChannel(channel, 'LOL');
});

const values = [];

bot.on('message', ({type, text}) => {

  if (type === 'message' && text && text.substr(0, 4) === '&lt;') {
    text = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    values.push(text);
    console.log(this.values);
  }
});


http.createServer(function (request, response) {
  response.writeHead(200, {'Content-type': 'text/plan'});
  response.write(JSON.stringify(values));
  response.end();
}).listen(7000);
