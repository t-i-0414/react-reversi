import React from 'react';
import styled from 'styled-components';
import useBoard from 'src/components/organisms/board/hook';
import Square from 'src/components/atoms/square';
import Piece from 'src/components/atoms/piece';
import Const from 'src/const';

const { Size, Color } = Const;

export interface BoardProps {
  dataCy: string;
}
const Board: React.FC<BoardProps> = ({ dataCy }) => {
  const {
    board,
    sideSquaresCount,
    hasCanBeTurnOverPieces,
    hasPlacedPiece,
    placePiece,
  } = useBoard();

  return (
    <Wrapper size={sideSquaresCount * Size.SQUARE_SIZE} data-cy={dataCy}>
      {board.map((square: Square) => {
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
    </Wrapper>
  );
};

interface StyledBoardProps {
  size: number;
}
const Wrapper = styled.div<StyledBoardProps>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin-bottom: 16px;
  border: 1px solid ${Color.BD_BLACK};
`;

export default Board;
