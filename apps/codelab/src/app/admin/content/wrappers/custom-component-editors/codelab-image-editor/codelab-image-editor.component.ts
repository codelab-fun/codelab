import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'codelab-image-editor',
  templateUrl: './codelab-image-editor.component.html',
  styleUrls: ['./codelab-image-editor.component.scss']
})
export class CodelabImageEditorComponent {
  @Input() src;
  @Input() data;
  @Input() dataChange;

  constructor(private storage: AngularFireStorage) {}

  uploadFile([f]: NgxFileDropEntry[]) {
    const entry = f.fileEntry;
    if (entry.isFile) {
      const name = +Date().toString() + '_' + entry.name;
      const ref = this.storage.ref(name);
      (entry as any).file(async file => {
        const task = await ref.put(file);
        this.src = await task.ref.getDownloadURL();
        this.update();
      });
    }
  }

  update() {
    const props = {
      src: this.src
    };

    this.dataChange(props);
  }
}
