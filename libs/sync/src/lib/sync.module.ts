import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginService } from '@codelab/firebase-login';
import { SlidesModule } from '@codelab/slides';
import { LeaderboardModule } from './components/poll/sync-poll-presenter/leaderboard/leaderboard.module';
import { SyncPollModule } from './components/poll/sync-poll.module';
import { QuestionsModule } from './components/questions/questions.module';
import { SyncRegistrationModule } from './components/registration/sync-registration.module';
import { SyncSessionsModule } from './components/sync-sessions/sync-sessions.module';
import { AllViewerValuesDirective } from './directives/all-viewer-values.directive';
import { SyncDirectivesModule } from './directives/sync-directives.module';
import { SyncButtonModule } from './sync-button/sync-button.module';
import { SyncPlaygroundPresenterComponent } from './sync-playground/sync-playground-presenter/sync-playground-presenter.component';
import { SyncPlaygroundTestComponent } from './sync-playground/sync-playground-test/sync-playground-test.component';
import { SyncPlaygroundComponent } from './sync-playground/sync-playground.component';
import { SyncCodeGameModule } from './components/sync-code-game/sync-code-game.module';

@NgModule({
  imports: [
    SyncDirectivesModule,
    SyncSessionsModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatMenuModule,
    MatInputModule,
    SlidesModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    SyncRegistrationModule,
    QuestionsModule,
    SyncPollModule,
    SyncButtonModule,
    LeaderboardModule,
    SyncCodeGameModule,
  ],
  providers: [LoginService],
  declarations: [
    AllViewerValuesDirective,
    SyncPlaygroundComponent,
    SyncPlaygroundPresenterComponent,
    SyncPlaygroundTestComponent,
  ],
  exports: [AllViewerValuesDirective, SyncPlaygroundComponent],
})
export class SyncModule {}
