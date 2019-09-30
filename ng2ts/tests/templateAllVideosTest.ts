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
  try { TestBed.compileComponents(); } catch(e) { console.log(e); }
});

describe('Blabla', () => {
  it(`@@assignFakeVideosToComponent`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.componentInstance.search('');
    chai.expect(fixture.componentInstance.videos.length, 'Should have no dogs').equals(3);
    });

  it(`@@IterateWithNgForAndDisplayTitle`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.search('itten');
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).contains(fixture.componentInstance.videos[0].title);
    chai.expect(fixture.nativeElement.innerHTML).contains(fixture.componentInstance.videos[1].title);

    fixture.componentInstance.search('cat');
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).contains(fixture.componentInstance.videos[0].title);
  });

  it(`@@alsoDisplayThumbnail`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.search('');
    fixture.detectChanges();
    const images = fixture.nativeElement.querySelectorAll('img');
    chai.expect(images.length).equals(3);
    chai.expect(images[1].getAttribute('src')).equals(fixture.componentInstance.videos[1].src);
    chai.expect(images[0].getAttribute('src')).equals(fixture.componentInstance.videos[0].src);
  });

  it(`@@insideSearchMethodFilterFakeVideos`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.search('itten');
    chai.expect(fixture.componentInstance.videos.length, 'Should have 2 kitten videos').equals(2);
    fixture.componentInstance.search('cat');
    chai.expect(fixture.componentInstance.videos.length, 'Should have 1 cat').equals(1);
    fixture.componentInstance.search('dog');
    chai.expect(fixture.componentInstance.videos.length, 'Should have no dogs').equals(0);
  });

  // it(`#Bonus app.html: Make hitting enter work in the input trigger the search`, () => {
  //   //TODO
  // });

  it(`@@bonusDisplayAllVideosByDefault`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const images = fixture.nativeElement.querySelectorAll('img');
    chai.expect(images.length).equals(3);
  });
});

