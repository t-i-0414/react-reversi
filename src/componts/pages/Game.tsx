import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Board from '../organisms/Board';

const { Color } = Const;

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
  color: ${Color.TX_BLACK};
`;

const Game: React.FC = () => (
  <Wrapper>
    <Board squaresOnSide={8} />
  </Wrapper>
);

export default Game;
