import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

import Piece from '../atoms/Piece';

const { Color } = Const;

const Square: React.FC = () => (
  <Wrapper>
    <Piece color="white" />
  </Wrapper>
);

const Wrapper = styled.div`
  align-items: center;
  background-color: ${Color.BG_GREEN};
  border: 1px solid ${Color.BD_BLACK};
  box-sizing: border-box;
  display: flex;
  height: 80px;
  justify-content: center;
  width: 80px;
`;

export default Square;
