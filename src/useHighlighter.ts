import { useCallback } from 'react';
import type { Anchor } from './types';

const getXPath = (element: Node): number[] => {
  const path: number[] = [];
  let current: Node | null = element;

  while (current && current.parentNode) {
    const parent = current.parentNode;
    const siblings = Array.from(parent.childNodes);
    const index = siblings.indexOf(current);
    path.unshift(index);
    current = parent;
  }

  return path;
};

export const useHighlighter = (onCreate: (anchor: Anchor) => void) => {
  return useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();
    if (!text) return;

    const anchor: Anchor = {
      id: '', // Will be set by the provider
      text,
      startPath: getXPath(range.startContainer),
      startOffset: range.startOffset,
      endPath: getXPath(range.endContainer),
      endOffset: range.endOffset,
    };

    onCreate(anchor);
    selection.removeAllRanges();
  }, [onCreate]);
}; 