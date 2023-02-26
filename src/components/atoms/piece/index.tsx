import React from 'react';
import styled, { css } from 'styled-components';
import type { MapValues, AllPieceColorMap } from '~/types';
import { ColorMap, PieceColor } from '~/const';

export interface PieceProps {
  pieceColor: MapValues<AllPieceColorMap>;
  onclick?: () => void;
  dataCy?: string;
}
const Piece: React.FC<PieceProps> = ({ pieceColor, onclick, dataCy }) => {
  switch (pieceColor) {
    case PieceColor.WHITE:
      return <StyledPiece color={ColorMap.PC_WHITE} />;
    case PieceColor.BLACK:
      return <StyledPiece color={ColorMap.PC_BLACK} />;
    case PieceColor.INVISIBLE:
      return (
        <StyledPiece
          color={ColorMap.PC_INVISIBLE}
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
};
const StyledPiece = styled.span<StyledPieceProps>`
  display: block;
  width: 80%;
  height: 80%;
  background-color: ${props => props.color};
  ${props =>
    props.color === ColorMap.PC_INVISIBLE
      ? css`
          border: none;

          &:hover {
            cursor: pointer;
          }
        `
      : css`
          border: 1px solid ${ColorMap.BD_BLACK};
        `}

  border-radius: 50%;
`;

export default Piece;
