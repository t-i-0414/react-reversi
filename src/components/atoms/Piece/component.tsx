import React from 'react';
import Const from 'src/const';
import styled from 'styled-components';

const { Color } = Const;

interface PieceProp {
  color: typeof Color[keyof typeof Color];
  onclick?: () => void;
  dataCy?: string;
}

const Piece: React.FC<PieceProp> = ({ onclick, dataCy, color }) => {
  return <StyledPiece color={color} onClick={onclick} data-cy={dataCy} />;
};

type StyledPieceProp = {
  color: string;
};
const StyledPiece = styled.span<StyledPieceProp>`
  display: block;
  width: 80%;
  height: 80%;
  background-color: ${(props) => props.color};
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`;

export default Piece;
