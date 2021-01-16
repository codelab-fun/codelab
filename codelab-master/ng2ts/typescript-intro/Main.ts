import { Codelab } from './Codelab';
import { Guest } from './Guest';

// Use this file for reference.
const guests: Guest[] = [
  {
    coming: true,
    name: `Sir Isaac Newton`
  },
  {
    coming: true,
    name: `Marie Curie`
  },
  {
    coming: true,
    name: `Albert Einstein`
  },
  {
    coming: false,
    name: `Charles Darwin`
  }];

let guestsOutput;
try {
  const codelab = new Codelab(guests);
   guestsOutput = codelab.getGuestsComing && codelab.getGuestsComing().map((guest: Guest) => `<li>${guest.name}</li>`).join('');
} catch (e) {
  /* swallow */
}
if (guestsOutput) {
  // Angular is so much better than this:
  document.body.innerHTML = '<ul>' + guestsOutput + '</ul>';

} else {
  document.body.innerHTML = 'make all tests pass to see the preview';
}
