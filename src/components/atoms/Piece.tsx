import React from 'react';
import styled from 'styled-components';
import Const from 'src/const';

import { PlayerValType } from 'src/types';

const { Color, PlayerVal } = Const;
interface PieceProp {
  playerVal: PlayerValType;
  onclick?: () => void;
  dataCy?: string;
}

const Piece: React.FC<PieceProp> = ({ playerVal, onclick, dataCy }) => {
  switch (playerVal) {
    case PlayerVal.WHITE:
      return <StyledPiece color={Color.PC_WHITE} />;
    case PlayerVal.BLACK:
      return <StyledPiece color={Color.PC_BLACK} />;
    default:
      return (
        <StyledPiece
          color={Color.PC_INVISIBLE}
          onClick={onclick}
          data-cy={dataCy}
        />
      );
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
