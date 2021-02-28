import React from 'react';
import Const from 'src/const';
import Piece from 'src/components/atoms/Piece/component';

import { PlayerValType } from 'src/@types';

const { Color, PlayerVal } = Const;
interface PieceProp {
  playerVal: PlayerValType;
  onclick?: () => void;
  dataCy?: string;
}

const EnhancedPiece: React.FC<PieceProp> = ({ playerVal, onclick, dataCy }) => {
  switch (playerVal) {
    case PlayerVal.WHITE:
      return <Piece color={Color.PC_WHITE} />;
    case PlayerVal.BLACK:
      return <Piece color={Color.PC_BLACK} />;
    default:
      return (
        <Piece color={Color.PC_INVISIBLE} onclick={onclick} dataCy={dataCy} />
      );
  }
};

export default EnhancedPiece;
