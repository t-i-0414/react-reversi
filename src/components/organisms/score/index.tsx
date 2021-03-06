import React from 'react';
import Const from 'src/const';
import styled, { css } from 'styled-components';
import PlayerInformation from 'src/components/molecules/player-information/index';
import useScore from './hooks';

const { Color, Size, PieceColor } = Const;

const Score: React.FC = () => {
  const { players, currentPlayersPieceColor } = useScore();

  return (
    <Wrapper>
      <ContentHeader>Score</ContentHeader>

      <Container currentPlayersPieceColor={currentPlayersPieceColor}>
        <PlayerInformation gamePlayer={players.black} />

        <Separator>
          <Line />
        </Separator>

        <PlayerInformation gamePlayer={players.white} />
      </Container>
    </Wrapper>
  );
};

export default Score;

const Wrapper = styled.div`
  width: 512px;
`;

const ContentHeader = styled.p`
  margin: 0;
  font-size: ${Size.FS_24};
  line-height: 1;
  text-align: center;
`;

interface ContainerProps {
  currentPlayersPieceColor: GamePlayer['pieceColor'];
}
const Container = styled.div<ContainerProps>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;

  ${(props) =>
    props.currentPlayersPieceColor === PieceColor.BLACK &&
    css`
      &::before {
        position: absolute;
        left: -28px;
        display: block;
        width: 0;
        height: 0;
        content: '';
        border-color: transparent red transparent transparent;
        border-style: solid;
        border-width: 12px;
      }
    `}

  ${(props) =>
    props.currentPlayersPieceColor === PieceColor.WHITE &&
    css`
      &::after {
        position: absolute;
        right: -28px;
        display: block;
        width: 0;
        height: 0;
        content: '';
        border-color: transparent transparent transparent red;
        border-style: solid;
        border-width: 12px;
      }
    `}
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
