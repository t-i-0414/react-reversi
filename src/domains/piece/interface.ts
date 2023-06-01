export type Piece = 'white' | 'black' | 'canTurnOver';
export type PieceColor = Exclude<Piece, 'canTurnOver'>;
