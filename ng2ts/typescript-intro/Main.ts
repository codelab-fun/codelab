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
  }
];

try {
  const codelab = new Codelab(guests);

// Angular is so much better than this:
  document.body.innerHTML =
  '<ul>' +
    codelab
    .getGuestsComing()
    .map((guest: Guest) => `<li>${guest.name}</li>`)
    .join('') +
    '</ul>';

} catch (e) {
  document.body.innerHTML = 'Result will appear once you complete the exercise...';
}
