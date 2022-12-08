import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  Provider,
  QueryList,
  Type,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MultiselectModule } from './multiselect.module';
import { MultiselectModel } from './multiselect-model';
import { MultiselectListDirective } from './multiselect-list.directive';
import { MultiselectItemDirective } from './multiselect-item.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div [multiselectList]="selectionModel">
      <div class="item" *ngFor="let item of items" [multiselectItem]="item">
        {{ item }}
      </div>
    </div>
  `
})
class MultiselectTestComponent {
  @ViewChild(MultiselectListDirective)
  multiselectListInstance: MultiselectListDirective<string>;
  @ViewChildren(MultiselectItemDirective) multiselectItems: QueryList<
    MultiselectItemDirective<string>
  >;

  public items = ['a', 'b', 'c', 'd', 'e'];

  public selectionModel: MultiselectModel<string> = new MultiselectModel(
    this.items
  );
}

describe('Multiselect', () => {
  function createComponent<T>(
    componentType: Type<T>,
    providers: Provider[] = [],
    extraDeclarations: Type<any>[] = []
  ): ComponentFixture<T> {
    TestBed.configureTestingModule({
      imports: [MultiselectModule],
      declarations: [componentType, ...extraDeclarations],
      providers: [...providers]
    });

    return TestBed.createComponent<T>(componentType);
  }

  it('should select item', () => {
    const fixture = createComponent(MultiselectTestComponent);

    fixture.detectChanges();

    const itemEls = fixture.debugElement.queryAll(By.css('.item'));

    const itemEl = itemEls[0].nativeElement;

    itemEl.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();

    expect(fixture.componentInstance.selectionModel.selected).toEqual(['a']);
  });

  it('should do not deselect selected if click on same thing', () => {
    const fixture = createComponent(MultiselectTestComponent);

    fixture.detectChanges();

    const itemEls = fixture.debugElement.queryAll(By.css('.item'));

    const itemEl = itemEls[0].nativeElement;

    itemEl.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();

    itemEl.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();

    expect(fixture.componentInstance.selectionModel.selected).toEqual(['a']);
  });

  it('selecting with ctrl', () => {
    const fixture = createComponent(MultiselectTestComponent);

    fixture.detectChanges();

    const itemEls = fixture.debugElement.queryAll(By.css('.item'));

    const itemFirstEl = itemEls[0].nativeElement;
    const itemSecondEl = itemEls[1].nativeElement;

    itemFirstEl.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();

    itemSecondEl.dispatchEvent(
      new MouseEvent('click', {
        ctrlKey: true
      })
    );

    fixture.detectChanges();

    expect(fixture.componentInstance.selectionModel.selected).toEqual([
      'a',
      'b'
    ]);
  });

  it('selecting with shift', () => {
    const fixture = createComponent(MultiselectTestComponent);

    fixture.detectChanges();

    const itemEls = fixture.debugElement.queryAll(By.css('.item'));

    const itemFirstEl = itemEls[0].nativeElement;
    const itemSecondEl = itemEls[3].nativeElement;

    itemFirstEl.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();

    itemSecondEl.dispatchEvent(
      new MouseEvent('click', {
        shiftKey: true
      })
    );

    fixture.detectChanges();

    expect(fixture.componentInstance.selectionModel.selected).toEqual([
      'a',
      'b',
      'c',
      'd'
    ]);
  });
});
