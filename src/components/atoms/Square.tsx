import React from 'react';
import styled from 'styled-components';
import Const from 'src/const';

const { Size, Color } = Const;

const Square: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${Size.SQUARE_SIZE}px;
  height: ${Size.SQUARE_SIZE}px;
  background-color: ${Color.BG_GREEN};
  border: 1px solid ${Color.BD_BLACK};
`;

export default Square;
