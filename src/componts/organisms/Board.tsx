import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Square from '../molecules/Square';

const { Color } = Const;
const arr = new Array(64);
arr.fill(0);

export default () => {
  return (
    <Wrapper>
      {arr.map(() => (
        <Square />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid ${Color.BD_BLACK};
  display: flex;
  flex-wrap: wrap;
  height: 640px;
  margin: 0 auto;
  width: 640px;
`;
