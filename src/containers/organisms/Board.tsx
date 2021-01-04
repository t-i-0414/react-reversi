import React from 'react';
import useBoard from '../../hooks/use-board';
import Board from '../../components/organisms/Board';
import Square from '../../components/atoms/Square';
import Piece from '../../components/atoms/Piece';

interface BoardProp {
  onSideSquares: number;
}
const EnhancedBoard: React.FC<BoardProp> = ({ onSideSquares }) => {
  const {
    squaresCountsArray,
    boardState,
    hasReversiblePiece,
    reverseSquare,
    hasPlacedPiece,
  } = useBoard(onSideSquares);

  return (
    <Board onSideSquares={onSideSquares}>
      {squaresCountsArray.map((squareCount: number) => (
        <Square key={boardState[squareCount].id}>
          {hasReversiblePiece(squareCount) && (
            <Piece
              playerVal={boardState[squareCount].val}
              onclick={() => {
                reverseSquare(squareCount);
              }}
            />
          )}

          {hasPlacedPiece(squareCount) && (
            <Piece playerVal={boardState[squareCount].val} />
          )}
        </Square>
      ))}
    </Board>
  );
};

export default EnhancedBoard;
