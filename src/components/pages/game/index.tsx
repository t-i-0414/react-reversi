import React from 'react';
import styled from 'styled-components';
import ResetModal from '~/components/molecules/reset-modal';
import Board from '~/components/organisms/board';
import Score from '~/components/organisms/score';
import SettingForm from '~/components/organisms/setting-form';
import { ColorMap } from '~/const';
import useGame from './hooks';

export interface GameProps {
  dataCy?: string;
}
const Game: React.FC<GameProps> = ({ dataCy }) => {
  const { isGameStarted, isGameFinished } = useGame();

  return (
    <>
      <StyledHeading>React Reversi</StyledHeading>

      {isGameStarted && (
        <>
          <GameWrapper data-cy={dataCy}>
            <Board dataCy='board' />
            <Score />
          </GameWrapper>
          {isGameFinished && <ResetModal />}
        </>
      )}

      {!isGameStarted && <SettingForm dataCy={dataCy} />}
    </>
  );
};

const StyledHeading = styled.h1`
  margin: 12px 0;
  color: ${ColorMap.TX_DEEP_BLACK};
  text-align: center;
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1026px;
  height: 760px;
  margin: 0 auto;
  color: ${ColorMap.TX_BLACK};
`;

export default Game;
