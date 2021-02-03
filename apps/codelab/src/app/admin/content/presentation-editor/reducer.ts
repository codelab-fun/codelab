import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ContentPresentation } from './types';

export function reducer(
  presentations: ContentPresentation[],
  { type, payload, presentationId }
) {
  function findBlockById(blockId: string) {
    const result = getSlide().blocks.findIndex(({ id }) => id === blockId);
    console.assert(result !== -1);
    return result;
  }

  function getSlide() {
    const slide = getPresentation().slides.find(
      ({ id }) => id === payload.slideId
    );
    console.assert(!!slide);
    return slide;
  }

  function getPresentation(): ContentPresentation {
    const presentation = presentations.find(({ id }) => id === presentationId);
    console.assert(!!presentation);
    return presentation;
  }

  switch (type) {
    case 'init':
      return payload;
    case 'addSlide':
      getPresentation().slides.splice(payload.index, 0, payload.slide);
      return presentations;
    case 'deleteSlide':
      getPresentation().slides.filter(({ id }) => id !== payload.id);
      return presentations;

    case 'addBlock': {
      const slide = getSlide();
      slide.blocks.push(payload.block);
      return presentations;
    }
    case 'updateBlock': {
      const slide = getSlide();
      const blockIndex = findBlockById(payload.block.id);
      slide.blocks[blockIndex] = payload.block;
      return presentations;
    }
    case 'reorderBlocks': {
      const slide = getSlide();
      const toIndex = findBlockById(payload.toId);
      const fromIndex = findBlockById(payload.fromId);
      moveItemInArray(slide.blocks, fromIndex, toIndex);
      return presentations;
    }
    case 'deleteBlock': {
      const slide = getSlide();
      slide.blocks = slide.blocks.filter(({ id }) => id !== payload.blockId);
      return presentations;
    }
    case 'updateSlideMeta':
      getSlide()[payload.name] = payload.value;
      return presentations;
  }

  console.assert(false);
  throw new Error('Unknown action: ' + type);
}
