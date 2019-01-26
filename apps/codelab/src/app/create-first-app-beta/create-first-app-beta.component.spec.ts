import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CreateFirstAppBetaComponent } from "./create-first-app-beta.component";
describe("CreateFirstAppBetaComponent", () => {
  let component: CreateFirstAppBetaComponent;
  let fixture: ComponentFixture<CreateFirstAppBetaComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateFirstAppBetaComponent]
    });
    fixture = TestBed.createComponent(CreateFirstAppBetaComponent);
    component = fixture.componentInstance;
  });
  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
});
