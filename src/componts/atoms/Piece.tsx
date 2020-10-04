import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

const { Color } = Const;

export default () => {
  return <Piece></Piece>;
};

const Piece = styled.span`
  &:hover {
    cursor: pointer;
  }
  background-color: ${Color.BG_BLACK};
  border-radius: 50%;
  display: block;
  height: 80%;
  width: 80%;
`;
