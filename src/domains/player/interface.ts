import { PieceColor } from '~/domains/piece/interface';

export type Player = {
  name: string;
};

export type PlayerInformation = {
  name: string;
  pieceColor: PieceColor;
  score: number;
};
