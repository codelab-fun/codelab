import { Api } from '../api.servie';
import {
  app_html,
  context_context_html,
  thumbs_thumbs_html,
  toggle_panel_toggle_panel_html,
  video_video_component_html
} from '../code';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { ContextComponent } from '../context/context.component';
import { ContextService } from '../context/context.service';
import { TestBed } from '@angular/core/testing';
import { ThumbsComponent } from '../thumbs/thumbs.component';
import { TogglePanelComponent } from '../toggle-panel/toggle-panel.component';
import { VideoComponent } from '../video/video.component';
import { VideoService } from '../video/video.service';
import 'initTestBed';

function objectValues(object) {
  return Object.keys(object).reduce((result, key) => {
    result.push(object[key]);
    return result;
  }, []);
}

function objectFindPropOfType(object, Type) {
  return Object.keys(object).reduce((prop, key) => {
    if (prop) {
      return prop;
    }

    if (object[key] instanceof Type) {
      return key;
    }
  }, undefined);
}

function objectHasAn(object, Type) {
  return objectValues(object).some(val => val instanceof Type);
}

const sampleVideo = Api.fetch('')[0];

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService, ContextService, /* that's a hack, to provide parent component */ VideoComponent],
    declarations: [AppComponent, VideoComponent, TogglePanelComponent, ContextComponent, ThumbsComponent]
  });
  TestBed.overrideComponent(AppComponent, {set: {template: app_html}});
  TestBed.overrideComponent(VideoComponent, {set: {template: video_video_component_html}});
  TestBed.overrideComponent(TogglePanelComponent, {set: {template: toggle_panel_toggle_panel_html}});
  TestBed.overrideComponent(ContextComponent, {set: {template: context_context_html}});
  TestBed.overrideComponent(ThumbsComponent, {set: {template: thumbs_thumbs_html}});

  try { TestBed.compileComponents(); } catch(e) { console.log(e); }
});

describe('Children', () => {
  it(`ContextComponent: Inject the ContextService into the constructor and store it as a property.`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(objectHasAn(fixture.componentInstance, ContextService)).to.be.true;
  });

  it(`ContextComponent: Inject the parent component (VideoComponent) into the constructor and store it as a property.`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(objectHasAn(fixture.componentInstance, VideoComponent)).to.be.true;
  });

  it(`ContextComponent: Add an ngOnInit method to the component. 
      (It's a special method angular will call when the component is created).`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(fixture.componentInstance.ngOnInit).is.a('function');
  });

  it(`ContextComponent: In the onOnInit method Call 'getAdText' on the service, 
      and pass it the video 'description' provided by the injected video component.
      Assign the result to the declared text property.`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    const componentInstance = fixture.componentInstance;

    const vcProp = objectFindPropOfType(componentInstance, VideoComponent);
    chai.expect(vcProp, `'VideoComponent' was not injected.`).to.not.be.undefined;

    componentInstance[vcProp].video = sampleVideo;
    chai.expect(componentInstance.ngOnInit).is.a('function');
    componentInstance[vcProp].video.description = 'music';
    componentInstance.ngOnInit();
    fixture.detectChanges();

    chai.expect(fixture.nativeElement.innerHTML).to.contain('speakers');

    componentInstance[vcProp].video.description = 'banana';
    componentInstance.ngOnInit();
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).to.contain('Check out our web site');
  });

  it(`app.module.ts: Add the ContextComponent to the AppModule declarations (We did this for you).`, () => {
    let metadata;
    try {
      metadata = AppModule['__annotations__'][0];
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata.declarations || [], `Video component not found`).contains(ContextComponent);
  });

  it(`video.component.html: Actually display the ad (We actually also did it for you).`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // TODO: Actually write a test
    // chai.expect(fixture.nativeElement.querySelector('my-ad')).to.be.ok
  });
});

