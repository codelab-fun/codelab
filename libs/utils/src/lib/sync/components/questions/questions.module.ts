import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { QuestionsComponent } from '@codelab/utils/src/lib/sync/components/questions/questions.component';
import { QuestionsAdminComponent } from '@codelab/utils/src/lib/sync/components/questions/questions-admin/questions-admin.component';
import { SyncDirectivesModule } from '@codelab/utils/src/lib/sync/directives/sync-directives.module';
import { QuestionsViewerComponent } from './questions-viewer/questions-viewer.component';
import { QuestionsPresenterComponent } from './questions-presenter/questions-presenter.component';
import { QuestionComponent } from './common/question/question.component';
import { QuestionListComponent } from '@codelab/utils/src/lib/sync/components/questions/common/question-list/question-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    SyncDirectivesModule,
    MatIconModule,
    FormsModule,
    MatExpansionModule,
  ],
  declarations: [
    QuestionsComponent,
    QuestionsAdminComponent,
    QuestionsViewerComponent,
    QuestionsPresenterComponent,
    QuestionComponent,
    QuestionListComponent,
  ],
  exports: [QuestionsComponent],
})
export class QuestionsModule {}
