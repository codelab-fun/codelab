import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from '@codelab/utils/src/lib/sync/components/questions/questions.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule
} from '@angular/material';
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
    MatExpansionModule
  ],
  declarations: [
    QuestionsComponent,
    QuestionsAdminComponent,
    QuestionsViewerComponent,
    QuestionsPresenterComponent,
    QuestionComponent,
    QuestionListComponent
  ],
  exports: [QuestionsComponent]
})
export class QuestionsModule {}
