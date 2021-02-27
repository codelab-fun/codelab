import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Location } from '@angular/common';
import { CdkDragDrop, CdkDragStart, DragRef } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentService } from '../services/content.service';
import { NavigationService } from '../services/navigation.service';
import { ContentSlide } from '../types';

import { MultiselectModel } from '../../../../multiselect/multiselect-model';

function normalizeSelectionIndexes(indexes: number[]): number[] {
    return indexes.filter((index) => index >= 0);
}

function selectionModelToIndexes<T>(items: T[], model: MultiselectModel<T>): number[] {
    return normalizeSelectionIndexes(model.selected.map((item) => items.indexOf(item)));
}

function slideIdsMapper(slides: ContentSlide[]): string[] {
  return slides.map(slide => slide.id);
}

@Component({
  selector: 'slides-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit, OnChanges {
  @Input() slides: ContentSlide[];
  @Input() currentSlideIndex = 0;
  @Input() presentationId!: string;

  public dragging: DragRef = null;
  public elementHasFocus = false;
  public selectionModel: MultiselectModel<string> = new MultiselectModel();
  public slideIds: string[] = [];

  constructor(
    readonly el: ElementRef,
    readonly location: Location,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly contentService: ContentService,
    readonly navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.resetSelected();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.slides) {
      this.slideIds = slideIdsMapper(changes.slides.currentValue);

      this.selectionModel.setValues(this.slideIds);
    }
  }

  trackBySlideId(index: number, slide: ContentSlide) {
    return slide.id;
  }

  addSlide() {
    this.contentService.addSlide(this.presentationId);
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  nextSlide(event: KeyboardEvent) {
    if (this.elementHasFocus) {
      this.navigationService.nextSlide(this.presentationId);
      event.preventDefault();
    }
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  prevSlide(event: KeyboardEvent) {
    if (this.elementHasFocus) {
      this.navigationService.previousSlide(this.presentationId);
      event.preventDefault();
    }
  }

  @HostListener('document:keydown', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.elementHasFocus) {
      return;
    }

    if (event.key === 'Escape' && this.dragging) {
      this.dragging.reset();
      document.dispatchEvent(new Event('mouseup'));

      event.preventDefault();
    } else if (event.key === 'Delete') {
      this.contentService.deleteSlides(
        this.presentationId,
        selectionModelToIndexes(this.slideIds, this.selectionModel)
      );

      event.preventDefault();
    }
  }

  @HostListener('document:click', ['$event'])
  private handleClickEvent(event: MouseEvent) {
    this.elementHasFocus = this.el.nativeElement.contains(event.target);
  }

  dragStarted(event: CdkDragStart) {
    this.dragging = event.source._dragRef;
  }

  dragEnded() {
    this.dragging = null;
  }

  dropped() {
    this.dragging = null;
  }

  droppedIntoList(event: CdkDragDrop<any, any>) {
    const selectedSlideIndexes = selectionModelToIndexes(this.slideIds, this.selectionModel);

    this.contentService.reorderSlides(
      this.presentationId,
      selectedSlideIndexes,
      event.currentIndex - selectedSlideIndexes.length + 1
    );
  }

  resetSelected() {
    this.selectSingle(this.slides[this.currentSlideIndex].id);
  }

  selectSingle(id: string) {
    this.selectionModel.selectSingle(id);
  }

  select(event: MouseEvent, index: number) {
    if (!this.dragging) {
      this.navigationService.goToSlide(this.presentationId, index);
    }
  }

}
