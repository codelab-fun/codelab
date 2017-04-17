
import {TestBed} from '@angular/core/testing';
import {AppModule} from '../app.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import 'reflect-metadata';
let metadata;

beforeEach(() => {

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({declarations: []});
  try {
    metadata = Reflect.getMetadata('annotations', AppModule);
  } catch (e) {
    // Do nothing, we have assertions below for this case
  }
});

describe('Component', () => {
  it(`Create a class called 'AppModule'`, () => {
    chai.expect(typeof AppModule).equals('function');
  });

  // TODO: check if the module is exported
  // See 1-bootstrap/0-component/Test.ts

  it(`Add a NgModule decorator for the class`, () => {
    chai.expect(metadata).is.not.undefined
  });

  it(`Add 'BrowseModule' to the NgModule decorator imports`, () => {
    // TODO: Figure out if this is actually needed
    chai.expect(metadata[0].imports[0]).equals(BrowserModule);
  });

  it(`Add 'AppComponent' to the 'declarations' property of the decorator`, () => {
    chai.expect(metadata[0].declarations[0]).equals(AppComponent);
  });

  it(`Add 'AppComponent' to the 'bootstrap' property of the decorator`, () => {
    chai.expect(metadata[0].bootstrap[0]).equals(AppComponent);
  });
});

