import React from 'react';
import styled from 'styled-components';
import useBoard from 'src/components/organisms/Board/hook';
import Square from 'src/components/atoms/Square/component';
import Piece from 'src/components/atoms/Piece/component';
import Const from 'src/const';

const { Size, Color } = Const;

export interface BoardProps {
  dataCy: string;
}
const Board: React.FC<BoardProps> = ({ dataCy }) => {
  const {
    boardState,
    sideSquaresCount,
    hasCanBeTurnOverPieces,
    hasPlacedPiece,
    placePiece,
  } = useBoard();

  return (
    <StyledBoard size={sideSquaresCount * Size.SQUARE_SIZE} data-cy={dataCy}>
      {boardState.map((square: Square) => {
        return (
          <Square key={square.key} dataCy={`square-${square.key}`}>
            {hasCanBeTurnOverPieces(square) && (
              <Piece
                playerVal={square.val}
                onclick={() => {
                  placePiece(square);
                }}
                dataCy="clickable"
              />
            )}
            {hasPlacedPiece(square) && <Piece playerVal={square.val} />}
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
