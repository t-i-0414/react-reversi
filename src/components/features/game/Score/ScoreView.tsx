import React from 'react';
import styled, { css } from 'styled-components';
import { ColorMap, SizeMap } from '~/const';
import { PieceColor, PlayerInformation as TPlayerInformation } from '~/domains';
import { PlayerInformation } from './PlayerInformation';

export type Props = {
  currentTurnPiece: PieceColor;
  blackPiecePlayerInformation: TPlayerInformation;
  whitePiecePlayerInformation: TPlayerInformation;
};

export const ScoreView: React.FC<Props> = ({
  currentTurnPiece,
  blackPiecePlayerInformation,
  whitePiecePlayerInformation,
}) => (
  <Wrapper>
    <ContentHeader>Score</ContentHeader>

    <Container currentTurnPiece={currentTurnPiece}>
      <PlayerInformation {...blackPiecePlayerInformation} nameSide='left' />

      <Separator>
        <Line />
      </Separator>

      <PlayerInformation {...whitePiecePlayerInformation} nameSide='right' />
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  width: fit-content;
  margin: 0 16px;
`;

const ContentHeader = styled.p`
  margin: 0;
  font-size: ${SizeMap.FS_24};
  line-height: 1;
  text-align: center;
`;

interface ContainerProps {
  currentTurnPiece: PieceColor;
}
const Container = styled.div<ContainerProps>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;

  ${props =>
    props.currentTurnPiece === 'black' &&
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

  ${props =>
    props.currentTurnPiece === 'white' &&
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
  background-color: ${ColorMap.BG_BLACK};
`;
