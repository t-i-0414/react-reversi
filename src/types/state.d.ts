import type { MapValues } from './util';

export type AllPieceColorMap = {
  WHITE: 'white';
  BLACK: 'black';
  INVISIBLE: 'invisible';
};
export type AllPieceColor = MapValues<AllPieceColorMap>;

export type FixedPieceColorMap = Omit<AllPieceColorMap, 'INVISIBLE'>;
export type FixedPieceColor = MapValues<FixedPieceColorMap>;

export type Square = {
  key: number;
  column: number;
  row: number;
  pieceColor: AllPieceColor;
};

export type Board = Square[];

export type GamePlayer = {
  name: string;
  shortName: string;
  playerValue: string;
  pieceColor: FixedPieceColor;
  score: number;
  current: boolean;
};

export type Store = {
  game: {
    isGameStarted: boolean;
    board: Board;
    sideSquaresCount: number;
    players: {
      [key in FixedPieceColor]: GamePlayer;
    };
  };
};
