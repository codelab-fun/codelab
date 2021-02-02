import { moveItemInArray } from '@angular/cdk/drag-drop';

export function reducer(slides, { type, payload }) {
  function findBlockById(blockId: string) {
    const result = getSlide().blocks.findIndex(({ id }) => id === blockId);
    console.assert(result !== -1);
    return result;
  }

  function getSlide() {
    const slide = slides.find(({ id }) => id === payload.slideId);
    console.assert(slide);
    return slide;
  }

  switch (type) {
    case 'init':
      return payload;
    case 'addSlide':
      slides.splice(payload.index, 0, payload.slide);
      return slides;

    case 'deleteSlide':
      return slides.filter(({ id }) => id !== payload.id);

    case 'addBlock': {
      const slide = getSlide();
      slide.blocks.push(payload.block);
      return slides;
    }
    case 'updateBlock': {
      const slide = getSlide();
      const blockIndex = findBlockById(payload.block.id);
      slide.blocks[blockIndex] = payload.block;
      return slides;
    }
    case 'reorderBlocks': {
      const slide = getSlide();
      const toIndex = findBlockById(payload.toId);
      const fromIndex = findBlockById(payload.fromId);
      moveItemInArray(slide.blocks, fromIndex, toIndex);
      return slides;
    }
    case 'deleteBlock': {
      const slide = getSlide();
      slide.blocks = slide.blocks.filter(({ id }) => id !== payload.blockId);
      return slides;
    }
    case 'updateSlideMeta':
      getSlide()[payload.name] = payload.value;
      return slides;
  }

  console.assert(false);
  throw new Error('Unknown action: ' + type);
}
