import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { FileFolderNode, createFolderStructure, getIconType } from './file-tree.utils';
import { MatTreeNestedDataSource } from '@angular/material';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'codelab-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: [
    './file-tree.component.scss',
    './icons/icons.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeComponent {
  /**
   * The following items are for the structure of the material tree nodes.
   *
   * Used to create data structure required by the material tree component.
   */
  dataSource = new MatTreeNestedDataSource<any>();
  fileRootNode: FileFolderNode[] = [];
  treeControl = new NestedTreeControl<any>(node => node.children);
  activeTabIndex = 0;

  folderExpandedState = {};

  @Input() set fileNames(files: string[]) {
    createFolderStructure(
      this.fileRootNode,
      files.filter(f => !f.match(new RegExp(`^.*\.(execute)$`)))
    );

    // this.sort(this.fileRootNode);

    this.dataSource.data = [...this.fileRootNode];
  }

  @Input() activeModel: any;

  @Output() fileSelect = new EventEmitter<FileFolderNode>();

  protected hasChild = (_: number, node: FileFolderNode) => !!node.children && node.children.length > 0;

  isActiveFile(node: FileFolderNode) {
    return this.activeModel && this.activeModel.path === node.path;
  }

  updateActiveFileSelected(node: FileFolderNode) {
    this.fileSelect.emit(node);
  }


  toggleFolder(node: FileFolderNode) {
    let value = this.folderExpandedState[node.path];

    if(value == null) {
      value = this.folderExpandedState[node.path] = false;
    }

    this.folderExpandedState[node.path] = !value;
  }

  isExpanded(node: FileFolderNode) {
    return !this.folderExpandedState[node.path];
  }


  getIconType = getIconType;


  private sort(data: FileFolderNode[]) {
    data.sort((a, b) => {
      if (this.hasChild(null, a)) {
        this.sort(a.children);
      }

      if (this.hasChild(null, b)) {
        this.sort(b.children);
      }

      return a.path.localeCompare(b.path);
    })
  }
}
