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
