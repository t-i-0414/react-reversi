import type { PieceColor } from '~/domains/piece/interface';
import type { Square } from '~/domains/square/interface';
import type { Board } from './interface';

export const getPieceCountByColor = (board: Board, pieceColor: PieceColor) =>
  board.filter(square => square.piece === pieceColor).length;

export const getBoardSideSquareCount = (board: Board) =>
  Math.sqrt(board.length);

export const getLeftSquaresByLocation = ({
  board,
  baseColumn,
  baseRow,
}: {
  board: Board;
  baseColumn: Square['column'];
  baseRow: Square['row'];
}): Square[] =>
  board
    .filter(square => !!(square.row === baseRow && square.column < baseColumn))
    .reverse();

export const getRightSquaresByLocation = ({
  board,
  baseColumn,
  baseRow,
}: {
  board: Board;
  baseColumn: Square['column'];
  baseRow: Square['row'];
}): Square[] =>
  board.filter(
    square => !!(square.row === baseRow && square.column > baseColumn),
  );

export const getTopSquaresByLocation = ({
  board,
  baseColumn,
  baseRow,
}: {
  board: Board;
  baseColumn: Square['column'];
  baseRow: Square['row'];
}): Square[] =>
  board
    .filter(square => !!(square.row < baseRow && square.column === baseColumn))
    .reverse();

export const getBottomSquaresByLocation = ({
  board,
  baseColumn,
  baseRow,
}: {
  board: Board;
  baseColumn: Square['column'];
  baseRow: Square['row'];
}): Square[] =>
  board.filter(
    square => !!(square.row > baseRow && square.column === baseColumn),
  );

export const getUpperLeftSquaresByLocation = ({
  board,
  baseColumn,
  baseRow,
}: {
  board: Board;
  baseColumn: Square['column'];
  baseRow: Square['row'];
}): Square[] =>
  board
    .filter(
      square =>
        !!(square.row < baseRow && square.column < baseColumn) &&
        baseColumn - square.column === baseRow - square.row,
    )
    .reverse();

export const getUpperRightSquaresByLocation = ({
  board,
  baseColumn,
  baseRow,
}: {
  board: Board;
  baseColumn: Square['column'];
  baseRow: Square['row'];
}): Square[] =>
  board
    .filter(
      square =>
        !!(square.row < baseRow && square.column > baseColumn) &&
        square.column - baseColumn === baseRow - square.row,
    )
    .reverse();

export const getLowerLeftSquaresByLocation = ({
  board,
  baseColumn,
  baseRow,
}: {
  board: Board;
  baseColumn: Square['column'];
  baseRow: Square['row'];
}): Square[] =>
  board.filter(
    square =>
      !!(square.row > baseRow && square.column < baseColumn) &&
      square.column - baseColumn === baseRow - square.row,
  );

export const getLowerRightSquaresByLocation = ({
  board,
  baseColumn,
  baseRow,
}: {
  board: Board;
  baseColumn: Square['column'];
  baseRow: Square['row'];
}): Square[] =>
  board.filter(
    square =>
      !!(square.row > baseRow && square.column > baseColumn) &&
      baseColumn - square.column === baseRow - square.row,
  );

export const getEachDirectionSquaresByLocation = ({
  board,
  baseColumn,
  baseRow,
}: {
  board: Board;
  baseColumn: Square['column'];
  baseRow: Square['row'];
}): Array<Square[]> => [
  getLeftSquaresByLocation({ board, baseColumn, baseRow }),
  getRightSquaresByLocation({ board, baseColumn, baseRow }),
  getTopSquaresByLocation({ board, baseColumn, baseRow }),
  getBottomSquaresByLocation({ board, baseColumn, baseRow }),
  getUpperLeftSquaresByLocation({ board, baseColumn, baseRow }),
  getUpperRightSquaresByLocation({ board, baseColumn, baseRow }),
  getLowerLeftSquaresByLocation({ board, baseColumn, baseRow }),
  getLowerRightSquaresByLocation({ board, baseColumn, baseRow }),
];

export const getSquaresHavingCanTurnOverPiece = (
  squares: Square[],
  basePiece: PieceColor,
): Square[] => {
  const firstEmptySquareIndex = squares.findIndex(
    square => square.piece === null || square.piece === 'canTurnOver',
  );

  const sliceEndPoint =
    firstEmptySquareIndex === -1 ? squares.length : firstEmptySquareIndex;

  const squaresWithoutEmpty = squares.slice(0, sliceEndPoint);

  const firstSamePieceSquareIndex = squaresWithoutEmpty.findIndex(
    square => square.piece === basePiece,
  );

  if (firstSamePieceSquareIndex === -1) {
    return [];
  }

  const squaresHavingCanTurnOverPiece = squaresWithoutEmpty.slice(
    0,
    firstSamePieceSquareIndex,
  );

  return squaresHavingCanTurnOverPiece;
};

export const getSquaresHavingCanTurnOverPieceByEachDirection = ({
  board,
  baseSquare,
  currentTurnPiece,
}: {
  board: Board;
  baseSquare: Square;
  currentTurnPiece: PieceColor;
}): Square[] => {
  if (baseSquare.piece === 'black' || baseSquare.piece === 'white') {
    return [];
  }

  const squaresByEachDirection = getEachDirectionSquaresByLocation({
    board,
    baseColumn: baseSquare.column,
    baseRow: baseSquare.row,
  });

  const squaresHavingCanTurnOverPieceByDirection = squaresByEachDirection.map(
    squaresByDirection =>
      getSquaresHavingCanTurnOverPiece(squaresByDirection, currentTurnPiece),
  );

  const squaresHavingCanTurnOverPiece =
    squaresHavingCanTurnOverPieceByDirection.flat();

  return squaresHavingCanTurnOverPiece;
};

export const turnOverPieces = ({
  board,
  targetSquares,
  currentTurnPiece,
}: {
  board: Board;
  targetSquares: Square[];
  currentTurnPiece: PieceColor;
}): Board => {
  const newBoard = board.map(square => {
    const isTargetSquare = targetSquares.some(
      targetSquare =>
        targetSquare.column === square.column &&
        targetSquare.row === square.row,
    );

    if (isTargetSquare) {
      return {
        ...square,
        piece: currentTurnPiece,
      };
    }

    return square;
  });

  return newBoard;
};

export const updateBoardByNextTurnPiece = ({
  board,
  nextTurnPiece,
}: {
  board: Board;
  nextTurnPiece: PieceColor;
}): Board => {
  const newBoard = board.map(square => {
    if (square.piece === 'canTurnOver' || square.piece === null) {
      const SquaresHavingCanTurnOverPiece =
        getSquaresHavingCanTurnOverPieceByEachDirection({
          board,
          baseSquare: square,
          currentTurnPiece: nextTurnPiece,
        });

      if (SquaresHavingCanTurnOverPiece.length > 0) {
        const nextSquare: Square = {
          ...square,
          piece: 'canTurnOver',
        };

        return nextSquare;
      }

      return {
        ...square,
        piece: null,
      };
    }

    return square;
  });

  return newBoard;
};
