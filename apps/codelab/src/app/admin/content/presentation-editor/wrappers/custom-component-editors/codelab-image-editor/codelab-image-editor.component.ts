import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AngularFireStorage } from '@angular/fire/storage';
import { ContentService } from '../../../services/content.service';
import { ContentSlide, CustomBlock } from '../../../types';

@Component({
  selector: 'codelab-image-editor',
  templateUrl: './codelab-image-editor.component.html',
  styleUrls: ['./codelab-image-editor.component.scss'],
})
export class CodelabImageEditorComponent {
  @Input() src;
  @Input() data;
  @Input() slide: ContentSlide;
  @Input() block: CustomBlock;
  @Input() presentationId!: string;

  constructor(
    private readonly contentService: ContentService,
    private readonly storage: AngularFireStorage
  ) {}

  uploadFile([f]: NgxFileDropEntry[]) {
    const entry = f.fileEntry;
    if (entry.isFile) {
      const name = +Date().toString() + '_' + entry.name;
      const ref = this.storage.ref(name);
      (entry as any).file(async (file) => {
        const task = await ref.put(file);
        this.src = await task.ref.getDownloadURL();
        this.update();
      });
    }
  }

  update() {
    this.contentService.updateBlock(this.presentationId, this.slide.id, {
      ...this.block,
      props: { src: this.src },
    });
  }
}
