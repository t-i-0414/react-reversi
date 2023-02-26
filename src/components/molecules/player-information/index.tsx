import React from 'react';
import styled from 'styled-components';
import Piece from '~/components/atoms/piece';
import { ColorMap, SizeMap, PieceColor } from '~/const';
import type { GamePlayer } from '~/types';

export interface PlayerInformationProps {
  gamePlayer: GamePlayer;
}
const PlayerInformation: React.FC<PlayerInformationProps> = ({
  gamePlayer: { shortName, pieceColor, score },
}) => (
  <Wrapper>
    {pieceColor === PieceColor.BLACK && (
      <Inner>
        <StyledPiece pieceColor={PieceColor.BLACK} />
        <StyledPlayer color={ColorMap.TX_WHITE}>{shortName}</StyledPlayer>
      </Inner>
    )}

    <Score>{score}</Score>

    {pieceColor === PieceColor.WHITE && (
      <Inner>
        <StyledPiece pieceColor={PieceColor.WHITE} />
        <StyledPlayer color={ColorMap.TX_BLACK}>{shortName}</StyledPlayer>
      </Inner>
    )}
  </Wrapper>
);

export default PlayerInformation;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

const StyledPiece = styled(Piece)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type TStyledPlayer = {
  color: (typeof ColorMap)[keyof Pick<
    typeof ColorMap,
    'TX_BLACK' | 'TX_WHITE'
  >];
};
const StyledPlayer = styled.p<TStyledPlayer>`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  color: ${props => props.color};
  transform: translate(-50%, -50%);
`;

const Score = styled.span`
  display: block;
  font-size: ${SizeMap.FS_24};
`;
