import React from 'react';
import styled from 'styled-components';

interface PieceProps {
  color: string;
  display: 'none' | 'block';
  onclick: () => any;
}
const Piece: React.FC<PieceProps> = ({ color, display, onclick }) => {
  return <StyledPiece color={color} display={display} onClick={onclick} />;
};

type PieceStyle = {
  color: string;
  display: 'none' | 'block';
};
const StyledPiece = styled.span<PieceStyle>`
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
