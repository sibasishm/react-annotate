export type Anchor = {
  id: string;
  text: string;
  startPath: number[];
  startOffset: number;
  endPath: number[];
  endOffset: number;
};

export type Annotation = Anchor & {
  note?: string;
};

export type AnnotationContextType = {
  annotations: Annotation[];
  add: (anchor: Anchor) => void;
  update: (id: string, note: string) => void;
  remove: (id: string) => void;
}; 