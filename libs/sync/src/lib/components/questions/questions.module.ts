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
import { QuestionsComponent } from './questions.component';
import { QuestionsAdminComponent } from './questions-admin/questions-admin.component';
import { SyncDirectivesModule } from '../../directives/sync-directives.module';
import { QuestionsViewerComponent } from './questions-viewer/questions-viewer.component';
import { QuestionsPresenterComponent } from './questions-presenter/questions-presenter.component';
import { QuestionComponent } from './common/question/question.component';
import { QuestionListComponent } from './common/question-list/question-list.component';
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
