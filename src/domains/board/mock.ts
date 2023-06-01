import type { Board } from './interface';

export const base: Board = [
  { key: '0-0', column: 0, row: 0, piece: null },
  { key: '1-0', column: 1, row: 0, piece: null },
  { key: '2-0', column: 2, row: 0, piece: 'canTurnOver' },
  { key: '3-0', column: 3, row: 0, piece: null },
  { key: '0-1', column: 0, row: 1, piece: null },
  { key: '1-1', column: 1, row: 1, piece: 'black' },
  { key: '2-1', column: 2, row: 1, piece: 'white' },
  { key: '3-1', column: 3, row: 1, piece: 'canTurnOver' },
  { key: '0-2', column: 0, row: 2, piece: 'canTurnOver' },
  { key: '1-2', column: 1, row: 2, piece: 'white' },
  { key: '2-2', column: 2, row: 2, piece: 'black' },
  { key: '3-2', column: 3, row: 2, piece: null },
  { key: '0-3', column: 0, row: 3, piece: null },
  { key: '1-3', column: 1, row: 3, piece: 'canTurnOver' },
  { key: '2-3', column: 2, row: 3, piece: null },
  { key: '3-3', column: 3, row: 3, piece: null },
];
