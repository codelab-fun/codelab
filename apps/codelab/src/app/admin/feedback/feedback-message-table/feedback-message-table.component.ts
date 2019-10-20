import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Message } from '@codelab/feedback/src/lib/message';

const clearTags = (value: string) =>
  value.replace(/<[^>]+>/g, '').replace(/Angular Codelab \/ /, '');
const clearAllTags = (values: Message[]): Message[] =>
  values.map((m: Message) => ({
    ...m,
    header: clearTags(m.header || 'No header')
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
  templateUrl: './feedback-message-table.html',
  styleUrls: ['./feedback-message-table.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  closeReasons = [
    { name: '[Duplicate]', reason: '[Duplicate]' },
    { name: '[No fix]', reason: '[No fix]' },
    { name: '[Done]', reason: '[Done]' },
    { name: '[Nice message]', reason: '[Nice message, though not a real bug]' },
    { name: "[Can't reproduce]", reason: "[Can't reproduce]" }
  ];

  tableColumns = ['comment', 'name', 'header', 'timestamp', 'actions'];
}
