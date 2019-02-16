import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { toggle_panel_toggle_panel_html } from '../code';
import { TogglePanelComponent } from '../toggle-panel/toggle-panel.component';
import { WrapperComponent } from '../wrapper.component';
import 'initTestBed';


beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [],
    declarations: [TogglePanelComponent, WrapperComponent]
  });

  TestBed.overrideComponent(TogglePanelComponent, {
    set: {
      template: toggle_panel_toggle_panel_html
    }
  });
  try { TestBed.compileComponents(); } catch(e) { console.log(e); }
});

describe('Content projection', () => {
  it(`TogglePanel.Component.ts: We added the template and the selector for you, enjoy!`, () => {
  });

  it(`TogglePanel.Component.ts: Add a boolean property to the component. The property can have any name, and must have a default value.`, () => {
    let fixture = TestBed.createComponent(TogglePanelComponent);
    // the intent is to let them come up with the property name, so we assume there will be one.
    const props = Object.keys(fixture.componentInstance);

    chai.expect(props.length, `A property with a default value was not declared on the component.`).is.not.equal(0);
    chai.expect(props.length, `Too many properties were declared.`).is.not.greaterThan(1);
    const prop = props[0];
    chai.expect(fixture.componentInstance[prop], `Property '${prop}' is not of type boolean`).is.a('boolean');
    chai.expect(fixture.componentInstance[prop], `Property '${prop}' must have a default value`).is.not.undefined;
  });

  it(`togglePanel.html: Use content projection to only display the content with the selector .description by default.`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    chai.expect(fixture.debugElement.query(By.css('.description')), `Description should be displayed`).not.null;
    chai.expect(fixture.debugElement.query(By.css('.extra')), `Extra information should be hidden`).is.null;
  });

  it(`togglePanel.html: Add a button to show extra information`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    let buttons = fixture.nativeElement.querySelectorAll('button');
    chai.expect(buttons.length, `Should show exactly one button`).to.equals(1);
  });

  it(`togglePanel.html: When the button is pressed, switch the flag and only display the content with the '.extra' selector.`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    chai.expect(fixture.debugElement.query(By.css('.description')), `Description should be hidden`).is.null;
    chai.expect(fixture.debugElement.query(By.css('.extra')), `Extra information should be displayed`).not.null;
  });

  it(`togglePanel.html: Add a button to come back to the description`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    chai.expect(fixture.debugElement.query(By.css('.description')), `Description should be displayed`).not.null;
    chai.expect(fixture.debugElement.query(By.css('.extra')), `Extra information should be hidden`).is.null;
  });
});

