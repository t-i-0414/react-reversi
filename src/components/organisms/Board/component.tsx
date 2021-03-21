import React from 'react';
import styled from 'styled-components';
import useBoard from 'src/components/organisms/Board/hook';
import Square from 'src/components/atoms/Square/component';
import Piece from 'src/components/atoms/Piece/component';
import Const from 'src/const';

const { Size, Color } = Const;

export interface BoardProp {
  dataCy: string;
}
const Board: React.FC<BoardProp> = ({ dataCy }) => {
  const {
    boardSquaresArray,
    sideSquaresCount,
    hasReversiblePiece,
    reverseSquare,
    hasPlacedPiece,
  } = useBoard();

  return (
    <StyledBoard size={sideSquaresCount * Size.SQUARE_SIZE} data-cy={dataCy}>
      {boardSquaresArray.map((square: SquareState) => {
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
    </StyledBoard>
  );
};

interface StyledBoardProp {
  size: number;
}
const StyledBoard = styled.div<StyledBoardProp>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin-bottom: 16px;
  border: 1px solid ${Color.BD_BLACK};
`;

export default Board;
