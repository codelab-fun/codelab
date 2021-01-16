export interface Option {
  text: string;
  correct?: boolean;
  selected?: boolean;
  className?: string;
}
type Options = Option[];
