import { Directive, ElementRef, Renderer2, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[slidesMarkdown]'
})
export class MarkdownDirective implements AfterContentInit {
  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) { }

  ngAfterContentInit() {
    this.parseMarkdown();
  }

  parseMarkdown(): void {
    let text = this._elementRef.nativeElement.innerHTML;
    text = text.replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`);
    text = text.replace(/__(.*?)__/g, `<u>$1</u>`);
    text = text.replace(/~~(.*?)~~/g, `<i>$1</i>`);
    text = text.replace(/--(.*?)--/g, `<del>$1</del>`);
    this.setInnerHTML(text);
  }

  private setInnerHTML(text: string): void {
    this.clearInnerHTML();
    this._renderer.setProperty(this._elementRef.nativeElement, 'innerHTML', text);
  }

  private clearInnerHTML(): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'innerHTML', '');
  }
}
