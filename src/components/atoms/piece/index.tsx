import React from 'react';
import Const from 'src/const';
import styled, { css } from 'styled-components';

const { Color, PieceColor } = Const;

export interface PieceProps {
  pieceColor: UnionVal<PieceColorType>;
  onclick?: () => void;
  dataCy?: string;
}
const Piece: React.FC<PieceProps> = ({ pieceColor, onclick, dataCy }) => {
  switch (pieceColor) {
    case PieceColor.WHITE:
      return <StyledPiece color={Color.PC_WHITE} />;
    case PieceColor.BLACK:
      return <StyledPiece color={Color.PC_BLACK} />;
    case PieceColor.INVISIBLE:
      return (
        <StyledPiece
          color={Color.PC_INVISIBLE}
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
  color: typeof Color[keyof Pick<
    typeof Color,
    'PC_WHITE' | 'PC_BLACK' | 'PC_INVISIBLE'
  >];
};
const StyledPiece = styled.span<StyledPieceProps>`
  display: block;
  width: 80%;
  height: 80%;
  background-color: ${(props) => props.color};
  ${(props) =>
    props.color === Color.PC_INVISIBLE
      ? css`
          border: none;

          &:hover {
            cursor: pointer;
          }
        `
      : css`
          border: 1px solid ${Color.BD_BLACK};
        `}

  border-radius: 50%;
`;

export default Piece;
