import React from 'react';
import styled from 'styled-components';
import Const from 'src/const';

const { Color } = Const;

export interface GameProp {
  dataCy: string;
}
const Game: React.FC<GameProp> = ({ children, dataCy }) => {
  return <StyledGameWrapper data-cy={dataCy}>{children}</StyledGameWrapper>;
};

const StyledGameWrapper = styled.div`
  width: 1024px;
  margin: 64px auto;
  color: ${Color.TX_BLACK};
`;

export default Game;
