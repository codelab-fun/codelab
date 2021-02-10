import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import { Location } from '@angular/common';
import { CdkDragDrop, CdkDragStart, DragRef } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentService } from '../services/content.service';
import { NavigationService } from '../services/navigation.service';
import { ContentSlide } from '../types';
import {
  isCtrlEvent,
  isShiftEvent,
  MultiSelectionService
} from './multi-selection.service';

@Component({
  selector: 'slides-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  @Input() slides: ContentSlide[];
  @Input() currentSlideIndex = 0;
  @Input() presentationId!: string;

  public dragging: DragRef = null;
  public sidePanelInFocus = false;

  constructor(
    readonly el: ElementRef,
    readonly location: Location,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly multiSelectionService: MultiSelectionService,
    readonly contentService: ContentService,
    readonly navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.multiSelectionService.selections$.subscribe(selections => {
      console.log({ selections });
    });

    this.multiSelectionService.addToSelections(this.currentSlideIndex);
    this.multiSelectionService.lastSingleSelection = this.currentSlideIndex;
  }

  trackBySlideId(index: number, slide: ContentSlide) {
    return slide.id;
  }

  addSlide() {
    this.contentService.addSlide(this.presentationId);
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  nextSlide(event: KeyboardEvent) {
    if (this.sidePanelInFocus) {
      this.navigationService.nextSlide(this.presentationId);
      event.preventDefault();
    }
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  prevSlide(event: KeyboardEvent) {
    if (this.sidePanelInFocus) {
      this.navigationService.previousSlide(this.presentationId);
      event.preventDefault();
    }
  }

  @HostListener('document:keydown', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.sidePanelInFocus) {
      return;
    }

    if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
      const allSideIndexes = this.slides.map((slide, index) => index);
      this.multiSelectionService.selectAll(allSideIndexes);

      event.preventDefault();
    } else if (event.key === 'Escape' && this.dragging) {
      this.dragging.reset();
      document.dispatchEvent(new Event('mouseup'));

      event.preventDefault();
    } else if (event.key === 'Delete') {
      this.contentService.deleteSlides(
        this.presentationId,
        this.multiSelectionService.selections
      );
      this.multiSelectionService.resetSelection(this.currentSlideIndex);

      event.preventDefault();
    }
  }

  @HostListener('document:click', ['$event'])
  private handleClickEvent(event: MouseEvent) {
    this.sidePanelInFocus = this.el.nativeElement.contains(event.target);

    if (!this.sidePanelInFocus) {
      this.multiSelectionService.resetSelection(this.currentSlideIndex);
    }
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
    this.contentService.reorderSlides(
      this.presentationId,
      this.multiSelectionService.selections,
      event.currentIndex - this.multiSelectionService.selections.length + 1
    );

    this.multiSelectionService.resetSelection(this.currentSlideIndex);
  }

  select(event: MouseEvent, index: number) {
    this.multiSelectionService.select(event, index);

    if (!(isShiftEvent(event) || isCtrlEvent(event)) || !this.dragging) {
      this.navigationService.goToSlide(this.presentationId, index);
    }
  }
}
