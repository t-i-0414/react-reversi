import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Square from '../molecules/Square';

const { Color } = Const;

export default () => {
  return (
    <Wrapper>
      <Square />
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
