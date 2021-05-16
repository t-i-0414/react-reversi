import React, { useRef } from 'react';
import styled from 'styled-components';
import Square from 'src/components/atoms/square';
import Piece from 'src/components/atoms/piece';
import Const from 'src/const';
import { useBoardSelector, useBoardFunctions, useBoardScroll } from './hook';

const { Color } = Const;

export interface BoardProps {
  dataCy: string;
}
const Board: React.FC<BoardProps> = ({ dataCy }) => {
  const { squareList, boardSize } = useBoardSelector();

  const wrapperRef = useRef(null);
  useBoardScroll(wrapperRef, boardSize);

  const {
    hasCanBeTurnOverPieces,
    hasPlacedPiece,
    placePiece,
  } = useBoardFunctions();

  return (
    <Wrapper ref={wrapperRef}>
      <Container size={boardSize} data-cy={dataCy}>
        {squareList.map((square: Square) => {
          return (
            <Square key={square.key} dataCy={`square-${square.key}`}>
              {hasCanBeTurnOverPieces(square) && (
                <Piece
                  pieceColor={square.pieceColor}
                  onclick={() => {
                    placePiece(square);
                  }}
                  dataCy="clickable"
                />
              )}
              {hasPlacedPiece(square) && (
                <Piece pieceColor={square.pieceColor} />
              )}
            </Square>
          );
        })}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin-bottom: 16px;
  overflow: scroll;
`;

interface ContainerProps {
  size: number;
}
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: 1px solid ${Color.BD_BLACK};
`;

export default Board;
