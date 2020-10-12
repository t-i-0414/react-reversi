import React from 'react';
import styled from 'styled-components';
// import Const from '../../const';

// const { Color } = Const;

interface PieceProps {
  color: string;
}

const Piece: React.FC<PieceProps> = ({ color }) => <StyledPiece color={color} />;

const StyledPiece = styled.span`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: block;
  height: 80%;
  width: 80%;

  &:hover {
    cursor: pointer;
  }
`;

export default Piece;
