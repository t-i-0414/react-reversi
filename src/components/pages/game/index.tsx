import React from 'react';
import styled from 'styled-components';
import Board from 'src/components/organisms/board';
import Score from 'src/components/organisms/score';
import Const from 'src/const';
import SettingForm from 'src/components/organisms/setting-form';
import ResetModal from 'src/components/molecules/reset-modal';
import useGame from './hooks';

const { Color } = Const;

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
            <Board dataCy="board" />
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
  color: ${Color.TX_DEEP_BLACK};
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
  color: ${Color.TX_BLACK};
`;

export default Game;
