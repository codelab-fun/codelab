import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {VideoService} from '../video/video.service';
import {video_video_html} from '../code';
import {VideoComponent} from '../video/video.component';
import {Api} from '../api.service';
const video = Api.fetch('')[0];

beforeEach(() => {
  try {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [VideoService],
      declarations: [VideoComponent]
    });
    TestBed.overrideComponent(VideoComponent, {
      set: {
        template: video_video_html,
        templateUrl: undefined
      }
    });
    TestBed.compileComponents();
  } catch (e) {
    // whatever
  }
});

describe('Component tree', () => {
  describe('Make sure metadata is in place', () => {
    it(`VideoComponent.ts: Set the selector property to 'my-video'.`, () => {
      const metadata = Reflect.getMetadata('annotations', VideoComponent);
      chai.expect(metadata, `VideoComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata[0].selector, `VideoComponent's selector has to be 'my-video'.`).equals('my-video');
    });

    it(`VideoComponent.ts: Set the templateUrl to load the appropriate html file`, () => {
      const metadata = Reflect.getMetadata('annotations', VideoComponent);
      chai.expect(metadata, `VideoComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata[0].templateUrl, `VideoComponent's templateUrl should be set to './video.html'`).matches(/\.\/video\.html/);
    });

    it(`VideoComponent.ts: Add a video property and decorate it with @Input()`, () => {
      const metadata = Reflect.getMetadata('propMetadata', VideoComponent);
      chai.expect(metadata, `VideoComponent doesn't have any @Input()'s`).is.not.undefined;
      chai.expect(Object.keys(metadata).length, `VideoComponent doesn't have any @Input()'s`).equals(1);
      chai.expect(metadata.video, `VideoComponent's @Input()' should be called video.`).is.not.undefined;
    });
  });


  describe('Make sure things are displayed properly', () => {
    let fixture;
    beforeEach(() => {
      try {
        fixture = TestBed.createComponent(VideoComponent);
        fixture.componentInstance.video = video;
        fixture.detectChanges();
      } catch (e) {

      }
    });

    it(`Video.html: Display the video title`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video title`).contains(video.title);
    });

    it(`Video.html: Display the video thumbnail`, () => {
      const image = fixture.nativeElement.querySelector('img');
      chai.expect(image, `Can't find the thumbnal`).is.not.null;
      chai.expect(image.getAttribute('src')).equals(video.src);
    });

    it(`Video.html: Display the video description`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video description`).contains(video.description);
    });


    it(`Video.html: Display the video date`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video date`).contains(video.date);
    });

    it(`Video.html: Display the number video likes`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video like`).contains(video.likes);
    });

    it(`Video.html: Display the number of video views`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video description`).contains(video.views);
    });
  });
});

