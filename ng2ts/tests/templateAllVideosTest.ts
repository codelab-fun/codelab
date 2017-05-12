import { app_html } from '../code';
import { AppComponent } from '../app.component';
import { TestBed } from '@angular/core/testing';
import 'initTestBed';


beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ declarations: [AppComponent] });

  TestBed.overrideComponent(AppComponent, {
    set: {
      template: app_html,
      templateUrl: undefined
    }
  });
  TestBed.compileComponents();
});

describe('Blabla', () => {
  it(`app.component.ts: When 'search' is called, filter the 'FAKE_VIDEOS' by the title containing the search string
  and assign them to the 'videos' property you made earlier.
  (hint: don't use exact match )`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.componentInstance.search('itten');
      chai.expect(fixture.componentInstance.videos.length, 'Should have 2 kitten videos').equals(2);
      fixture.componentInstance.search('cat');
      chai.expect(fixture.componentInstance.videos.length, 'Should have 1 cat').equals(1);
      fixture.componentInstance.search('dog');
      chai.expect(fixture.componentInstance.videos.length, 'Should have no dogs').equals(0);
    });

  it(`app.html: Iterate over the videos using '*ngFor', and display a title for each`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.search('itten');
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).contains(fixture.componentInstance.videos[0].title);
    chai.expect(fixture.nativeElement.innerHTML).contains(fixture.componentInstance.videos[1].title);

    fixture.componentInstance.search('cat');
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).contains(fixture.componentInstance.videos[0].title);
  });

  it(`app.html: Also display a thumbnail`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.search('itten');
    fixture.detectChanges();
    const images = fixture.nativeElement.querySelectorAll('img');
    chai.expect(images.length).equals(2);
    chai.expect(images[1].getAttribute('src')).equals(fixture.componentInstance.videos[1].src);
    chai.expect(images[0].getAttribute('src')).equals(fixture.componentInstance.videos[0].src);
  });

  // it(`#Bonus app.html: Make hitting enter work in the input trigger the search`, () => {
  //   //TODO
  // });

  it(`#Bonus app.component.ts: When the component is created, trigger a search for an empty string. `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const images = fixture.nativeElement.querySelectorAll('img');
    chai.expect(images.length).equals(3);
  });
});

