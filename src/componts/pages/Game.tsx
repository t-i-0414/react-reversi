import React, { useState } from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Board from '../organisms/Board';

const { Color } = Const;

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
  color: ${Color.TX_BLACK};
`;

const Game: React.FC = () => {
  const [isGameStart, setGameStart] = useState(true); // TODO:最後にfalseにする

  return (
    <Wrapper>
      {!isGameStart && (
        <button
          type="button"
          onClick={() => {
            setGameStart(true);
          }}
        >
          Game Start
        </button>
      )}
      {isGameStart && <Board onSideSquares={8} />}
    </Wrapper>
  );
};

export default Game;
