import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import styled from 'styled-components';
import { Piece } from '~/components/features/game/Piece';
import { SizeMap } from '~/constants';
import type {
  PieceColor,
  PlayerInformation as TPlayerInformation,
} from '~/domains';

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
      <Player name={name} pieceColor={pieceColor} side={nameSide} />
    )}

    <Score>{score}</Score>

    {nameSide === 'right' && (
      <Player name={name} pieceColor={pieceColor} side={nameSide} />
    )}
  </Wrapper>
);

const Player: React.FC<{
  name: string;
  pieceColor: PieceColor;
  side: 'left' | 'right';
}> = memo(
  ({ name, pieceColor, side }) => (
    <>
      {side === 'left' && (
        <>
          <PlayerName>{name}</PlayerName>
          <Piece pieceColor={pieceColor} size='48px' />
        </>
      )}
      {side === 'right' && (
        <>
          <Piece pieceColor={pieceColor} size='48px' />
          <PlayerName>{name}</PlayerName>
        </>
      )}
    </>
  ),
  isEqual,
);
Player.displayName = 'Player';

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
