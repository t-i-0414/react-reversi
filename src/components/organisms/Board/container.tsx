import React from 'react';
import useBoard from 'src/components/organisms/Board/hook';
import Board, { BoardProp } from 'src/components/organisms/Board/component';
import Square from 'src/components/atoms/Square/component';
import Piece from 'src/components/atoms/Piece/container';

const EnhancedBoard: React.FC<BoardProp> = ({ onSideSquares, dataCy }) => {
  const {
    boardState,
    hasReversiblePiece,
    reverseSquare,
    hasPlacedPiece,
  } = useBoard(onSideSquares);

  return (
    <Board onSideSquares={onSideSquares} dataCy={dataCy}>
      {boardState.map((square: SquareType) => {
        return (
          <Square key={square.id} dataCy={`square-${square.id}`}>
            {hasReversiblePiece(square.id) && (
              <Piece
                playerVal={square.val}
                onclick={() => {
                  reverseSquare(square.id);
                }}
                dataCy="clickable"
              />
            )}
            {hasPlacedPiece(square.id) && <Piece playerVal={square.val} />}
          </Square>
        );
      })}
    </Board>
  );
};

export default EnhancedBoard;
