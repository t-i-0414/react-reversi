import React from 'react';
import Const from 'src/const';
import styled, { css } from 'styled-components';
import useScore from './hooks';
import PlayerInformation from './player';

const { Color, Size, Player } = Const;

const Information: React.FC = () => {
  const currentPlayer = useScore();

  return (
    <Wrapper>
      <ContentHeader>Score</ContentHeader>

      <Container indicator={currentPlayer}>
        <PlayerInformation player={Player.WHITE} />

        <Separator>
          <Line />
        </Separator>

        <PlayerInformation player={Player.BLACK} />
      </Container>
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

interface ContainerProps {
  indicator: UnionVal<typeof Player>;
}
const Container = styled.div<ContainerProps>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 232px;
  margin: 0 auto;

  ${(props) =>
    props.indicator === Player.WHITE &&
    css`
      &::before {
        position: absolute;
        left: 0;
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
    props.indicator === Player.BLACK &&
    css`
      &::after {
        position: absolute;
        right: 0;
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
