import React from 'react';
import styled, { css } from 'styled-components';
import { ColorMap } from '~/const';
import type { Piece as TPiece } from '~/domains';

export interface Props {
  pieceColor: TPiece;
  size?: string;
  onclick?: () => void;
  dataCy?: string;
}

export const Piece: React.FC<Props> = ({
  pieceColor,
  size = '64px',
  onclick,
  dataCy,
}) => {
  switch (pieceColor) {
    case 'white':
      return <StyledPiece color={ColorMap.PC_WHITE} size={size} />;
    case 'black':
      return <StyledPiece color={ColorMap.PC_BLACK} size={size} />;
    case 'canTurnOver':
      return (
        <StyledPiece
          color={ColorMap.PC_INVISIBLE}
          size={size}
          onClick={onclick}
          data-cy={dataCy}
        />
      );
    default: {
      const exhaustiveCheck: never = pieceColor;

      return exhaustiveCheck;
    }
  }
};

type StyledPieceProps = {
  color: (typeof ColorMap)[keyof Pick<
    typeof ColorMap,
    'PC_WHITE' | 'PC_BLACK' | 'PC_INVISIBLE'
  >];
  size: string;
};
const StyledPiece = styled.span<StyledPieceProps>`
  box-sizing: border-box;
  display: block;
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: ${props => props.color};
  ${props =>
    props.color === ColorMap.PC_INVISIBLE
      ? css`
          border: none;
          border-radius: 50%;

          &:hover {
            cursor: pointer;
          }
        `
      : css`
          border: 1px solid ${ColorMap.BD_BLACK};
          border-radius: 50%;
        `}
`;
