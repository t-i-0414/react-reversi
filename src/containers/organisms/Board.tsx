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
    state,
    hasReversibleSquare,
    setSquare,
    hasPlacedSquare,
  } = useBoard(onSideSquares);

  return (
    <Board onSideSquares={onSideSquares}>
      {squaresCountsArray.map((squareCount: number) => (
        <Square key={state[squareCount].id}>
          {hasReversibleSquare(squareCount) && (
            <Piece
              playerVal={state[squareCount].val}
              onclick={() => {
                setSquare(squareCount);
              }}
            />
          )}

          {hasPlacedSquare(squareCount) && (
            <Piece playerVal={state[squareCount].val} />
          )}
        </Square>
      ))}
    </Board>
  );
};

export default EnhancedBoard;
