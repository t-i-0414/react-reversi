import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Board from '../organisms/Board';

const { Color } = Const;

export default () => {
  return (
    <Wrapper>
      <Board squares={64} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: ${Color.TX_BLACK};
  margin: 0 auto;
  width: 1024px;
`;
