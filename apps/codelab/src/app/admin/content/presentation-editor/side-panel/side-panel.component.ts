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
import {
  isFromContext,
  KeyboardEventWithTarget
} from '../../../../shared/helpers/helpers';

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
  public selectionModel: MultiselectModel<string> = new MultiselectModel();

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
      const slideIds = slideIdsMapper(changes.slides.currentValue);

      this.selectionModel.setItems(slideIds);
    }
  }

  trackBySlideId(index: number, slide: ContentSlide) {
    return slide.id;
  }

  addSlide() {
    this.contentService.addSlide(this.presentationId);
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  nextSlide(event: KeyboardEventWithTarget<HTMLElement>) {
    if (this.isFromSidePanelContext(event.target)) {
      this.navigationService.nextSlide(this.presentationId);

      event.preventDefault();
    }
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  prevSlide(event: KeyboardEventWithTarget<HTMLElement>) {
    if (this.isFromSidePanelContext(event.target)) {
      this.navigationService.previousSlide(this.presentationId);

      event.preventDefault();
    }
  }

  @HostListener('document:keydown.Escape', ['$event'])
  private handleEscapeEvent(event: KeyboardEventWithTarget<HTMLElement>) {
    if (this.isFromSidePanelContext(event.target) && this.dragging) {
      this.dragging.reset();

      // This is a workaround to completely reset dragging
      // https://stackoverflow.com/a/62537983
      document.dispatchEvent(new Event('mouseup'));

      event.preventDefault();
    }
  }

  @HostListener('document:keydown.Delete', ['$event'])
  private handleDeleteEvent(event: KeyboardEventWithTarget<HTMLElement>) {
    if (this.isFromSidePanelContext(event.target)) {
      const selectedSlideIndexes = this.getSelectedSlideIndexes();

      this.contentService.deleteSlides(
        this.presentationId,
        selectedSlideIndexes
      );

      event.preventDefault();
    }
  }

  @HostListener('document:keydown.control.a', ['$event'])
  @HostListener('document:keydown.meta.a', ['$event'])
  private handleCtrlMetaEvent(event: KeyboardEventWithTarget<HTMLElement>) {
    if (this.isFromSidePanelContext(event.target)) {
      this.selectionModel.toggleAll();

      event.preventDefault();
    }
  }

  private isFromSidePanelContext(target: HTMLElement): boolean {
    return isFromContext(target, target =>
      target.classList.contains('slides-wrapper')
    );
  }

  dragStarted(event: CdkDragStart) {
    // Undocumented reference to the underlying drag instance.
    // Its needed to reset dragging
    this.dragging = event.source._dragRef;
  }

  dragEnded() {
    this.dragging = null;
  }

  dropped() {
    this.dragging = null;
  }

  droppedIntoList(event: CdkDragDrop<ElementRef<HTMLElement>>) {
    const selectedSlideIndexes = this.getSelectedSlideIndexes();

    this.contentService.reorderSlides(
      this.presentationId,
      selectedSlideIndexes,
      event.currentIndex - selectedSlideIndexes.length + 1
    );
  }

  resetSelected() {
    this.selectSingle(this.slides[this.currentSlideIndex].id);
  }

  getSelectedSlideIndexes(): number[] {
    return this.selectionModel.getSelectedIndexes();
  }

  selectSingle(id: string) {
    this.selectionModel.selectSingle(id);
  }

  makeCurrent(event: MouseEvent, index: number) {
    if (!this.dragging) {
      this.navigationService.goToSlide(this.presentationId, index);
    }
  }
}
