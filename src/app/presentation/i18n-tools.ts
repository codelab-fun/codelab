export function extractMessages({nativeElement}) {
  return Array.from(nativeElement.children as Array<HTMLElement>).reduce((result, el) => {
    result[el.getAttribute('id')] = el.innerHTML;
    return result;
  }, {});

}
