import * as functions from 'firebase-functions';
const fetch = require('node-fetch');

export const feedbackLogger = functions.database
  .ref('/feedback/{pushId}')
  .onCreate((snapshot: any) => {
    const feedbackItem = snapshot.val();
    let message = `*${feedbackItem.name}* said "${feedbackItem.comment}" on page https://codelab.fun/${feedbackItem.href}`;
    message += feedbackItem.email
      ? `\nYou can get back to *${feedbackItem.name}* at ${feedbackItem.email}`
      : '';
    return fetch(functions.config().slack.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: message })
    });
  });
