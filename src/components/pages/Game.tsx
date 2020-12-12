import React, { useState } from 'react';
import styled from 'styled-components';
import Board from '../organisms/Board';
import Const from '../../const';

const { Color } = Const;

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
  color: ${Color.TX_BLACK};
`;

const Game: React.FC = () => {
  const [isGameStartFlg, setGameStart] = useState(true); // TODO:最後にfalseにする

  return (
    <Wrapper>
      {!isGameStartFlg && (
        <button
          type="button"
          onClick={() => {
            setGameStart(true);
          }}
        >
          Game Start
        </button>
      )}
      {isGameStartFlg && <Board onSideSquares={8} />}
    </Wrapper>
  );
};

export default Game;
