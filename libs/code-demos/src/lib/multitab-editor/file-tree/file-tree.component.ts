import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FileFolderNode } from '../multitab-editor.utilities';

@Component({
  selector: 'codelab-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeComponent implements OnInit {

  @Input() dataSource: any;

  @Input() treeControl: any;

  @Input() activeModel: any;

  @Output() fileSelect = new EventEmitter<FileFolderNode>();

  protected hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  constructor() { }

  ngOnInit() {
  }

  isActiveFile(node: FileFolderNode) {
    return this.activeModel && (this.activeModel.path === node.path);
  }

  updateActiveFileSelected(node) {
    this.fileSelect.emit(node);
  }

}
