export type SlideViewType = 'view' | 'preview' | 'edit';

export interface HTMLBlock {
  type: 'html';
  code: string;
  id: string;
}

export interface CustomBlock {
  type: 'custom';
  id: string;
  tag: string;
  props: Record<string, any>;
}

export type ContentBlock = HTMLBlock | CustomBlock;

export interface ContentSlide {
  blocks: ContentBlock[];
  id: string;
  title: string;
  milestone?: string;
}

export interface ContentPresentation {
  id: string;
  name: string;
  slides: ContentSlide[];
  version: number;
}

export function assertIsHtmlBlock(
  block: ContentBlock
): asserts block is HTMLBlock {
  if (block.type !== 'html') {
    throw new Error('Block type must be HTML!!! 🦊');
  }
}
export function assertIsCustomBlock(
  block: ContentBlock
): asserts block is CustomBlock {
  if (block.type !== 'custom') {
    throw new Error('Block type must be HTML!!! 🦊');
  }
}
