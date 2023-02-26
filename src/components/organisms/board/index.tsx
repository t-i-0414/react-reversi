import React, { useRef } from 'react';
import styled from 'styled-components';
import { useBoardSelector, useBoardFunctions, useBoardScroll } from './hook';
import type { Square as TSquare } from '~/types';
import Piece from '~/components/atoms/piece';
import Square from '~/components/atoms/square';
import { ColorMap } from '~/const';

export interface BoardProps {
  dataCy?: string;
}
const Board: React.FC<BoardProps> = ({ dataCy }) => {
  const { squareList, boardSize } = useBoardSelector();

  const wrapperRef = useRef(null);
  useBoardScroll(wrapperRef, boardSize);

  const { hasCanBeTurnOverPieces, hasPlacedPiece, placePiece } =
    useBoardFunctions();

  return (
    <Wrapper ref={wrapperRef}>
      <Container size={boardSize} data-cy={dataCy}>
        {squareList.map((square: TSquare) => (
          <Square key={square.key} dataCy={`square-${square.key}`}>
            {hasCanBeTurnOverPieces(square) && (
              <Piece
                pieceColor={square.pieceColor}
                onclick={() => {
                  placePiece(square);
                }}
                dataCy='clickable'
              />
            )}
            {hasPlacedPiece(square) && <Piece pieceColor={square.pieceColor} />}
          </Square>
        ))}
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
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 1px solid ${ColorMap.BD_BLACK};
`;

export default Board;
