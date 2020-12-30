import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

import { PlayerValType } from '../../types';

const { Color, PlayerVal } = Const;
interface PieceProps {
  playerVal: PlayerValType;
  onclick?: () => void;
}

const Piece: React.FC<PieceProps> = ({ playerVal, onclick }) => {
  switch (playerVal) {
    case PlayerVal.WHITE:
      return <StyledPiece color={Color.PC_WHITE} />;
    case PlayerVal.BLACK:
      return <StyledPiece color={Color.PC_BLACK} />;
    default:
      return <StyledPiece color={Color.PC_INVISIBLE} onClick={onclick} />;
  }
};

type StyledPieceProp = {
  color: string;
  onClick?: () => void;
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
