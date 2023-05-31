import React from 'react';
import styled from 'styled-components';
import { Piece } from '~/components/features/game/Piece';
import { SizeMap } from '~/constants';
import type { PlayerInformation as TPlayerInformation } from '~/domains';

export type Props = TPlayerInformation & {
  nameSide: 'left' | 'right';
};

export const PlayerInformation: React.FC<Props> = ({
  name,
  pieceColor,
  score,
  nameSide,
}) => (
  <Wrapper>
    {nameSide === 'left' && (
      <>
        <PlayerName>{name}</PlayerName>
        <Piece pieceColor={pieceColor} size='48px' />
      </>
    )}

    <Score>{score}</Score>

    {nameSide === 'right' && (
      <>
        <Piece pieceColor={pieceColor} size='48px' />
        <PlayerName>{name}</PlayerName>
      </>
    )}
  </Wrapper>
);

export default PlayerInformation;

const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const PlayerName = styled.span`
  display: block;
  max-width: 100px;
  font-size: ${SizeMap.FS_20};
  line-height: 1.2;
  word-break: break-word;
`;

const Score = styled.span`
  display: block;
  font-size: ${SizeMap.FS_24};
`;
