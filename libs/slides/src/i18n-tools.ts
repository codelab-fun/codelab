export function extractMessages({nativeElement}): { [key: string]: string } {
  return Array.from(nativeElement.children as Array<HTMLElement>).reduce((result, el) => {
    result[el.getAttribute('id')] = el.innerHTML;
    return result;
  }, {});

}
