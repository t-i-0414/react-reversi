import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Board from '../organisms/Board';

const { Color } = Const;

const Wrapper = styled.div`
  color: ${Color.TX_BLACK};
  margin: 0 auto;
  width: 1024px;
`;

const Game: React.FC = () => (
  <Wrapper>
    <Board squares={64} />
  </Wrapper>
);

export default Game;
