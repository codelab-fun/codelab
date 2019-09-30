import { Api } from '../api.service';
import { TestBed } from '@angular/core/testing';
import { video_video_component_html } from '../code';
import { VideoComponent } from '../video/video.component';
import { VideoService } from '../video/video.service';
import 'initTestBed';

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
        template: video_video_component_html,
        templateUrl: undefined
      }
    });
    try { TestBed.compileComponents(); } catch(e) { console.log(e); }
  } catch (e) {
    // whatever
  }
});

describe('Component Tree', () => {
  describe('Make sure metadata is in place', () => {

    it(`@@addComponentDecoratorAndSetSelectorToMyVideo`, () => {
      const metadata = VideoComponent['__annotations__'][0];
      chai.expect(metadata, `VideoComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata.selector, `VideoComponent's selector has to be 'my-video'.`).equals('my-video');
    });


    it(`@@setTemplateUrlToLoadAppropriateFile`, () => {
      const metadata = VideoComponent['__annotations__'][0];
      chai.expect(metadata, `VideoComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata.templateUrl, `VideoComponent's templateUrl should be set to './video.component.html'`)
        .matches(/\.\/video\.component\.html/);
    });


    it(`@@addVideoPropertyAndDecorateWithInput`, () => {
      const metadata = VideoComponent['__prop__metadata__'];

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


    it(`displayVideoTitle`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video title`).contains(video.title);
    });

    it(`@@displayVideoThumbnail`, () => {
      const image = fixture.nativeElement.querySelector('img');
      chai.expect(image, `Can't find the thumbnail`).is.not.null;
      chai.expect(image.getAttribute('src')).equals(video.src);
    });

    it(`@@displayVideoDescription`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video description`).contains(video.description);
    });

    it(`@@displayVideoData`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video date`).contains(video.date);
    });
    it(`@@displayNumberOfVideoLikes`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video like`).contains(video.likes);
    });
    it(`@@displayNumberOfVideoViews`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video description`).contains(video.views);
    });
  });
});

