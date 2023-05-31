import React from 'react';
import styled from 'styled-components';
import { Board } from '~/components/features/game/Board';
import { ResetModal } from '~/components/features/game/ResetModal';
import { Score } from '~/components/features/game/Score';
import { SettingForm } from '~/components/features/game/SettingForm';
import { ColorMap } from '~/constants';
import { useGame } from './useGame';

export const Game: React.FC = () => {
  const { isGameStarted, isGameFinished } = useGame();

  return (
    <>
      <StyledHeading>React Reversi</StyledHeading>

      {isGameStarted && (
        <>
          <GameWrapper>
            <Board />
            <Score />
          </GameWrapper>
          {isGameFinished && <ResetModal />}
        </>
      )}

      {!isGameStarted && <SettingForm />}
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
  width: 100%;
  max-width: 1026px;
  height: 100%;
  max-height: 760px;
  margin: 32px auto 0;
  color: ${ColorMap.TX_BLACK};
`;
