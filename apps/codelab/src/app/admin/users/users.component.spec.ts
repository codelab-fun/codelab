import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UsersModule } from './users.module';
import { SyncDbService } from '@codelab/utils/src/lib/sync/services/sync-db.service';
import { of } from 'rxjs';
import { LoginService } from '@codelab/firebase-login';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UsersModule],
      providers: [
        {
          provide: SyncDbService,
          useValue: { list: () => ({ snapshots$: of([]) }) }
        },
        {
          provide: LoginService,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
