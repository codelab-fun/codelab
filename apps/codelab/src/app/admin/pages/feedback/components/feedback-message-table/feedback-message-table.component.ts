import {
  Component,
  Input,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Message } from '@codelab/feedback';

const clearTags = (value: string) =>
  value.replace(/<[^>]+>/g, '').replace(/Angular Codelab \/ /, '');
const clearAllTags = (values: Message[]): Message[] =>
  values.map((m: Message) => ({
    ...m,
    header: clearTags(m.header || 'No header'),
  }));
const sortingDataAccessor = (item, property) => {
  switch (property) {
    case 'timestamp':
      return new Date(item.timestamp).toISOString();
    default:
      return item[property];
  }
};

@Component({
  selector: 'codelab-feedback-message-table',
  templateUrl: './feedback-message-table.component.html',
  styleUrls: ['./feedback-message-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackMessageTableComponent {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input('dataSource')
  set dataSourceSetter(values: Message[]) {
    this.dataSource.data = clearAllTags(values);
    this.dataSource.sortingDataAccessor = sortingDataAccessor;
    this.dataSource.sort = this.sort;
  }
  dataSource = new MatTableDataSource([]);

  tableColumns = ['comment', 'name', 'header', 'timestamp', 'actions'];
}
