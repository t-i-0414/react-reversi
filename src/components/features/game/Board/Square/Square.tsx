import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import styled from 'styled-components';
import { Piece } from '~/components/features/game/Piece';
import { SizeMap, ColorMap } from '~/constants';
import type { Piece as TPiece } from '~/domains';

export type SquareProps = {
  piece: TPiece | null;
  dataCy?: string;
  onclick?: (() => void) | null;
};

export const Square: React.FC<SquareProps> = memo(
  ({ dataCy, piece, onclick }) =>
    piece === null ? (
      <Wrapper data-cy={dataCy} />
    ) : (
      <Wrapper data-cy={dataCy}>
        {onclick ? (
          <Piece
            size={`${SizeMap.PIECE_SIZE}px`}
            pieceColor={piece}
            dataCy='clickable'
            onclick={onclick}
          />
        ) : (
          <Piece size={`${SizeMap.PIECE_SIZE}px`} pieceColor={piece} />
        )}
      </Wrapper>
    ),
  isEqual,
);
Square.displayName = 'Square';

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${SizeMap.SQUARE_SIZE}px;
  height: ${SizeMap.SQUARE_SIZE}px;
  background-color: ${ColorMap.BG_GREEN};
  border: 1px solid ${ColorMap.BD_BLACK};
`;
