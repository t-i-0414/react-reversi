import React from 'react';
import styled from 'styled-components';
import { ColorMap, SizeMap } from '~/constants';
import { BoardDomainService } from '~/domains';
import type { Board, Square as TSquare } from '~/domains';
import { Square } from './Square';

export type Props = {
  board: Board;
  onPlacePiece: (square: TSquare) => void;
};

export const BoardView: React.FC<Props> = ({ board, onPlacePiece }) => {
  const boardSideSquareCount =
    BoardDomainService.getBoardSideSquareCount(board);
  const boardSize = boardSideSquareCount * SizeMap.SQUARE_SIZE;

  return (
    <Wrapper>
      <Container size={boardSize} data-cy='board'>
        {board.map(square => {
          const hasCanTurnOverPiece = square.piece === 'canTurnOver';

          return hasCanTurnOverPiece ? (
            <Square
              key={`square-${square.key}`}
              dataCy={`square-${square.key}`}
              piece={square.piece}
              onclick={() => onPlacePiece(square)}
            />
          ) : (
            <Square
              key={`square-${square.key}`}
              dataCy={`square-${square.key}`}
              piece={square.piece}
            />
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
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 1px solid ${ColorMap.BD_BLACK};
`;
