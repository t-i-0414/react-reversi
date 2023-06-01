import { Piece } from '~/domains/piece/interface';

export type Square = {
  key: `${number}-${number}`; // `${column}-${row}`
  column: number;
  row: number;
  piece: Piece | null;
};
