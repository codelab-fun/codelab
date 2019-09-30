import { Guest } from './Guest'; /*d:codelabSolved*/ // Add your code here
/*d:initial:initial*/ /*/d*/ export class Codelab {
  constructor(public guests: Guest[]) {}

  getGuestsComing() {
    return this.guests.filter(guest => guest.coming);
  }
} /*d:neverShow*/
/*/d*/ // Needed for type checking
export function evalJs(param) {
  return param;
}
/*/d*/
