import React from 'react';
import styled from 'styled-components';
import Board from 'src/components/organisms/board';
import Score from 'src/components/organisms/score';
import Const from 'src/const';
import SettingForm from 'src/components/organisms/setting-form';
import useGame from './hooks';

const { Color } = Const;

export interface GameProps {
  dataCy: string;
}
const Game: React.FC<GameProps> = ({ dataCy }) => {
  const { isGameStarted } = useGame();

  return (
    <>
      <StyledHeading>React Reversi</StyledHeading>

      {isGameStarted ? (
        <GameWrapper data-cy={dataCy}>
          <Board dataCy="board" />
          <Score />
        </GameWrapper>
      ) : (
        <FormWrapper data-cy={dataCy}>
          <SettingForm />
        </FormWrapper>
      )}
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
  height: 768px;
  margin: 0 auto;
  color: ${Color.TX_BLACK};
`;

const FormWrapper = styled.div`
  width: fit-content;
  margin: 48px auto 0;
  color: ${Color.TX_BLACK};
`;

export default Game;
