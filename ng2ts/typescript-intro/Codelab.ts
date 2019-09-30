import { Guest } from './Guest'; /*d:codelabSolved*/ // Add your code here
/*d:initial:initial*/ /*/d*/ export class Codelab {
  constructor(public guests: Guest[]) {}

  getGuestsComing() {
    return this.guests.filter(guest => guest.coming);
  }
} /*d:neverShow*/ // Needed for type checking
/*/d*/ export function evalJs(param) {
  return param;
}
/*/d*/
