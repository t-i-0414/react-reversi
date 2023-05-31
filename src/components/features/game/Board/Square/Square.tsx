import React from 'react';
import styled from 'styled-components';
import { SizeMap, ColorMap } from '~/constants';

export interface SquareProps {
  dataCy?: string;
  children?: React.ReactNode;
}

export const Square: React.FC<SquareProps> = ({ children, dataCy }) => (
  <Wrapper data-cy={dataCy}>{children}</Wrapper>
);

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${SizeMap.SQUARE_SIZE}px;
  height: ${SizeMap.SQUARE_SIZE}px;
  background-color: ${ColorMap.BG_GREEN};
  border: 1px solid ${ColorMap.BD_BLACK};
`;
