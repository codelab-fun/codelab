import {
  Directive,
  ElementRef,
  Renderer2,
  AfterContentInit
} from '@angular/core';

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

  private parseMarkdown(): void {
    let t = this._elementRef.nativeElement.innerHTML;
    t = t.replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`);
    t = t.replace(/__(.*?)__/g, `<u>$1</u>`);
    t = t.replace(/~~(.*?)~~/g, `<i>$1</i>`);
    t = t.replace(/--(.*?)--/g, `<del>$1</del>`);
    this.setInnerHTML(t);
  }

  private setInnerHTML(html: string): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'innerHTML', html);
  }
}
