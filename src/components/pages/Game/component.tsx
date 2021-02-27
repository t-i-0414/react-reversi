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
