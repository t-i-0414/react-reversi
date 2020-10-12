import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Square from '../molecules/Square';

const { Color } = Const;

type Props = {
  squares: number,
}

export default (props: Props) => {
  return (
    <Wrapper>
      {[...Array(props.squares)].map((_, i) => (
        <Square key={++i} />
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
