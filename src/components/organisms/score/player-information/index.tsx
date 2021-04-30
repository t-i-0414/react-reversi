import React from 'react';
import Const from 'src/const';
import styled from 'styled-components';
import Piece from 'src/components/atoms/piece/index';

const { Size, Player } = Const;

interface PlayerInformationProps {
  player: UnionVal<typeof Player>;
}
const PlayerInformation: React.FC<PlayerInformationProps> = ({ player }) => {
  return (
    <Wrapper>
      {player === Player.WHITE && (
        <Inner>
          <Piece playerVal={Player.WHITE} />
        </Inner>
      )}

      <Score>2</Score>

      {player === Player.BLACK && (
        <Inner>
          <Piece playerVal={Player.BLACK} />
        </Inner>
      )}
    </Wrapper>
  );
};

export default PlayerInformation;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

const Score = styled.span`
  display: block;
  font-size: ${Size.FS_24};
`;
