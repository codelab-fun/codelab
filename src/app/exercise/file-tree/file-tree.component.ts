import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FileConfig } from './../interfaces/file-config';

interface Node {
  depth: number;
  files: FileConfig[];
  path: string;
}

@Component({
  selector: 'slides-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.css']
})
export class FileTreeComponent implements OnChanges {

  @Input()
  public files: FileConfig[];
  @Input()
  public active: FileConfig;
  @Output()
  public onSelectFile: EventEmitter<any> = new EventEmitter<FileConfig>();

  nodes: Node[] = [];

  constructor() {
  }

  ngOnChanges() {
    if (!!this.files) {
      this.nodes = this.fileConfigsToNodes(this.files);
    }
  }

  getFile(fileConfig: FileConfig): string {
    return fileConfig.path.split('/').pop();
  }

  getIcon(fileConfig: FileConfig): string {
    const ext = fileConfig.path.slice(fileConfig.path.lastIndexOf('.')).toLowerCase();
    switch (ext) {
      case '.ts':
        return '/assets/images/file-ts.png';
      case '.html':
        return '/assets/images/file-html.png';
      default:
        return '/assets/images/file.png';
    }

  }

  isActive(fileConfig: FileConfig): boolean {
    return this.active === fileConfig;
  }

  clickFile(fileConfig: FileConfig): void {
    fileConfig.opened = true;
    this.onSelectFile.emit(fileConfig);
    this.active = fileConfig;
  }

  private fileConfigsToNodes(files: FileConfig[]): Node[] {
    const paths: { [path: string]: Node } = {};
    files.filter(f => !f.hidden).forEach(f => {
      // Parts of the path up to the file level
      const parts = f.path.split('/').slice(0, -1);
      parts.unshift('app');
      // String representation of path
      const path = parts[parts.length - 1];
      // Initialize slot in map for path at depth
      if (!paths[path]) {
        paths[path] = {path, depth: parts.length, files: []};
      }
      // Add file configs to existing path
      paths[path].files.push(f);
    });
    // Return a sorted array
    return Object.keys(paths).map(key => paths[key])
      .sort((a, b) => a.path > b.path ? 1 : -1);
  }

}
