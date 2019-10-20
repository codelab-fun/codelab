import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
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
