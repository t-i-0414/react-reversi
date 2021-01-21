import React from 'react';
import styled from 'styled-components';
import Const from 'src/const';

const { Color } = Const;

const Game: React.FC = ({ children }) => {
  return <StyledGameWrapper>{children}</StyledGameWrapper>;
};

const StyledGameWrapper = styled.div`
  width: 1024px;
  margin: 64px auto;
  color: ${Color.TX_BLACK};
`;

export default Game;
