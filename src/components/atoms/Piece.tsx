import React from 'react';
import styled from 'styled-components';

// スタイル用
import Const from '../../const';

const { Color } = Const;

interface PieceProps {
  pieceVal: number;
  onclick?: () => void;
}
const Piece: React.FC<PieceProps> = ({ pieceVal, onclick }) => {
  switch (pieceVal) {
    case 1:
      return (
        <StyledPiece
          pieceVal={pieceVal}
          color="white"
          display="block"
          // onClick={onclick}
        />
      );
    case -1:
      return (
        <StyledPiece
          pieceVal={pieceVal}
          color="black"
          display="block"
          // onClick={onclick}
        />
      );
    default:
      return (
        <StyledPiece
          pieceVal={pieceVal}
          color={Color.PC_INVISIBLE}
          display="block"
          onClick={onclick}
        />
      );
  }
};

type StyledPieceProp = {
  pieceVal: number;
  color: string;
  display: 'none' | 'block';
};
const StyledPiece = styled.span<StyledPieceProp>`
  display: ${(props) => props.display};
  width: 80%;
  height: 80%;
  background-color: ${(props) => props.color};
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`;

export default Piece;
