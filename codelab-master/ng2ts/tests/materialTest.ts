import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { app_html, search_search_component_html, video_video_component_html } from '../code';
import { TestBed } from '@angular/core/testing';
import { VideoService } from '../video/video.service';
import { AppComponent } from '../app.component';
import { RouterModule } from '@angular/router';
import { VideoComponent } from '../video/video.component';
import 'initTestBed';
import { SearchComponent } from '../search/search.component';
import { Api } from '../api.service';
import { AppModule } from '../app.module';

function getCard() {
  const fixture = TestBed.createComponent(VideoComponent);
  fixture.componentInstance.video = Api.fetch('')[0];
  fixture.detectChanges();
  return fixture.nativeElement.querySelector('mat-card');
}

describe('material', () => {
  beforeEach(() => {
    try {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [VideoService],
        declarations: [AppComponent, SearchComponent, VideoComponent],
        imports: [RouterModule.forRoot([{path: '', component: SearchComponent}]), MatToolbarModule, MatCardModule]
      });
      TestBed.overrideComponent(AppComponent, {
        set: {
          template: app_html,
          templateUrl: undefined
        }
      });
      TestBed.overrideComponent(VideoComponent, {set: {template: video_video_component_html, templateUrl: undefined}});
      TestBed.overrideComponent(SearchComponent, {
        set: {
          template: search_search_component_html,
          templateUrl: undefined
        }
      });

      try { TestBed.compileComponents(); } catch(e) { console.log(e); }
    } catch (e) {
    }
  });

  it('AddMatModules', () => {
    let metadata;
    try {
      metadata = AppModule['__annotations__'][0];
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata.imports).to.contain(MatCardModule);
    chai.expect(metadata.imports).to.contain(MatToolbarModule);
  });

  it('AddMatToolbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const toolbar = fixture.nativeElement.querySelector('mat-toolbar');
    chai.expect(toolbar).is.ok;
    chai.expect(toolbar.innerHTML).to.contain('MewTube');
    // TODO(kirjs): Make sure the title is there only once.
  });

  it('UseMatCard', () => {
    chai.expect(getCard()).is.ok;
  });

  it('AddMatCardTitle', () => {
    const title = getCard().querySelector('mat-card-title');
    chai.expect(title).is.ok;
    chai.expect(title.innerText).to.contain(Api.fetch('')[0].title);
  });

  it('AddMatCardSubtitle', () => {
    const subTitle = getCard().querySelector('mat-card-subtitle');
    chai.expect(subTitle).is.ok;
    chai.expect(subTitle.innerText).to.contain(Api.fetch('')[0].description);
  });


  it('AddMatImage', () => {
    const img = getCard().querySelector('img[mat-card-image]');
    chai.expect(img).is.ok;
  });

  it('MoveDataToNewComponent', () => {
    const content = getCard().querySelector('mat-card-content');
    chai.expect(content).is.ok;
    chai.expect(content.innerText).contains(Api.fetch('')[0].likes);
    chai.expect(content.innerText).contains(Api.fetch('')[0].views);
    chai.expect(content.innerText).contains(Api.fetch('')[0].date);
  });
});
