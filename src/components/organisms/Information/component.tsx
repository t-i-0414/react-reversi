import React from 'react';
import Const from 'src/const';
import styled from 'styled-components';
import Piece from 'src/components/atoms/Piece/component';

const { Color, Size, PlayerVal } = Const;

// .
const Information: React.FC = () => {
  return (
    <Wrapper>
      <ContentHeader>Score</ContentHeader>
      <MainContainer>
        <PlayerInformation>
          <PieceContainer>
            <Piece playerVal={PlayerVal.WHITE} />
          </PieceContainer>
          <CurrentCounts>2</CurrentCounts>
        </PlayerInformation>
        <Separator>
          <Line />
        </Separator>
        <PlayerInformation>
          <CurrentCounts>2</CurrentCounts>
          <PieceContainer>
            <Piece playerVal={PlayerVal.BLACK} />
          </PieceContainer>
        </PlayerInformation>
      </MainContainer>
    </Wrapper>
  );
};

export default Information;

const Wrapper = styled.div`
  width: 512px;
`;

const ContentHeader = styled.p`
  margin: 0;
  font-size: ${Size.FS_24};
  line-height: 1;
  text-align: center;
`;

const MainContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 232px;
  margin: 0 auto;

  &::before {
    position: absolute;
    left: 0;
    display: none;
    width: 0;
    height: 0;
    content: '';
    border-color: transparent red transparent transparent;
    border-style: solid;
    border-width: 12px;
  }

  &::after {
    position: absolute;
    right: 0;
    display: none;
    width: 0;
    height: 0;
    content: '';
    border-color: transparent transparent transparent red;
    border-style: solid;
    border-width: 12px;
  }
`;

const PlayerInformation = styled.div`
  display: flex;
  align-items: center;
`;

const PieceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

const CurrentCounts = styled.span`
  display: block;
  font-size: ${Size.FS_24};
`;

const Separator = styled.div`
  box-sizing: border-box;
  height: 48px;
  padding: 24px 8px 0;
`;

const Line = styled.span`
  box-sizing: border-box;
  display: block;
  width: 20px;
  height: 2px;
  background-color: ${Color.BG_BLACK};
`;
