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
    <StyledGameWrapper data-cy={dataCy}>
      {isGameStarted ? (
        <>
          <Board dataCy="board" />
          <Score />
        </>
      ) : (
        <SettingForm />
      )}
    </StyledGameWrapper>
  );
};

const StyledGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1026px;
  height: 768px;
  margin: 0 auto;
  color: ${Color.TX_BLACK};
`;

export default Game;
