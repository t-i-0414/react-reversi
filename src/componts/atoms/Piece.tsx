import React from 'react';
import styled from 'styled-components';
// import Const from '../../const';

// const { Color } = Const;

interface PieceProps {
  color: string;
}

const Piece: React.FC<PieceProps> = ({ color }) => (
  <StyledPiece color={color} />
);

const StyledPiece = styled.span`
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
