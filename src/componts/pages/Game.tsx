import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

const { Color } = Const;

export default () => {
  return (
    <Wrapper>
      <p>This is a Game Component.</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`

  color: ${Color.TX_BLACK};
  margin: 0 auto;
  width: 1024px;
`;
