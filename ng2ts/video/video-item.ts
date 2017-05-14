export interface VideoItem {
  title: string;
  src: string;
  // "?" after property name means the property is optional.
  description?: string;
  views?: number;
  likes?: number;
  date?: string;
}
