import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/atoms/Button/component';
import Board from 'src/components/organisms/Board/component';
import Information from 'src/components/organisms/Information/component';
import Const from 'src/const';
import useGame from './hooks';

const { Color } = Const;

export interface GameProp {
  dataCy: string;
}
const Game: React.FC<GameProp> = ({ dataCy }) => {
  const { isGameStart, startGame } = useGame();

  return (
    <StyledGameWrapper data-cy={dataCy}>
      {isGameStart ? (
        <>
          <Board dataCy="board" />
          <Information />
        </>
      ) : (
        <Button
          onClick={() => {
            startGame(8);
          }}
          text="Game Start"
          dataCy="start"
        />
      )}
    </StyledGameWrapper>
  );
};

const StyledGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 992px;
  height: 768px;
  margin: 0 auto;
  color: ${Color.TX_BLACK};
`;

export default Game;
