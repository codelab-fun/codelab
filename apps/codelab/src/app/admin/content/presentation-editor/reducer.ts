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
    case 'deleteSlides':
      getPresentation().slides = getPresentation().slides.filter(
        (slide, index) => !payload.selections.includes(index)
      );

      return presentations;
    case 'reorderSlides':
      const toIndex = payload.toIndex;
      const selections = payload.selections;

      const slides = getPresentation().slides;

      const normalizeIndexes = (indexes, array) =>
        indexes.filter(index => index >= 0 && index < array.length);

      const normalizeToIndex = (toIndex, array, moveIndexes) =>
        Math.min(Math.max(0, toIndex), array.length - moveIndexes.length);

      const arrayMoveByIndex = (array, index, toIndex) => {
        const indexes = Array.isArray(index) ? index : [index];
        const normalizedIndexes = normalizeIndexes(indexes, array);
        const normalizedToIndex = normalizeToIndex(toIndex, array, indexes);

        const moveValues = normalizedIndexes.map(moveIndex => array[moveIndex]);

        const dontMoveValues = array.filter(
          (item, index) => normalizedIndexes.indexOf(index) === -1
        );

        dontMoveValues.splice(normalizedToIndex, 0, ...moveValues);
        return dontMoveValues;
      };

      getPresentation().slides = [
        ...arrayMoveByIndex(slides, selections, toIndex)
      ];

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

    // Presentations
    case 'addPresentation':
      presentations.push(payload);
      return presentations;
    case 'deletePresentation':
      return presentations.filter(({ id }) => id !== payload.presentationId);
    case 'updatePresentationMeta':
      getPresentation()[payload.name] = payload.value;
      return presentations;
  }

  console.assert(false);
  throw new Error('Unknown action: ' + type);
}
