import React from 'react';
import styled from 'styled-components';
import { Piece } from '~/components/features/game/Piece';
import { ColorMap, SizeMap } from '~/const';
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
          if (square.piece === 'canTurnOver') {
            return (
              <Square
                key={`square-${square.key}`}
                dataCy={`square-${square.key}`}
              >
                <Piece
                  size='52px'
                  pieceColor={square.piece}
                  onclick={() => {
                    onPlacePiece(square);
                  }}
                  dataCy='clickable'
                />
              </Square>
            );
          }

          if (square.piece === 'black' || square.piece === 'white') {
            return (
              <Square
                key={`square-${square.key}`}
                dataCy={`square-${square.key}`}
              >
                <Piece size='52px' pieceColor={square.piece} />
              </Square>
            );
          }

          return (
            <Square
              key={`square-${square.key}`}
              dataCy={`square-${square.key}`}
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
