import React from 'react';
import styled from 'styled-components';
import { ColorMap, SizeMap } from '~/const';

export interface ButtonProps {
  text: string;
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  dataCy?: string;
}
const Button: React.FC<ButtonProps> = ({ text, type, onClick, dataCy }) => (
  <StyledBottom type={type} onClick={onClick} data-cy={dataCy}>
    {text}
  </StyledBottom>
);
export default Button;

export const StyledBottom = styled.button`
  position: relative;
  z-index: 0;
  display: block;
  padding: 8px 16px;
  margin: 0 auto;
  overflow: hidden;
  font-size: ${SizeMap.FS_16};
  line-height: 1.2;
  background: none;
  border: 1px solid ${ColorMap.BD_BLACK};
  border-radius: 4px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    content: '';
    background-color: ${ColorMap.BG_WHITE};
  }

  &::after {
    position: absolute;
    top: 0;
    left: -100%;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background-color: ${ColorMap.BG_BLACK};
    transition: all 0.3s ease-out;
  }

  &:hover {
    color: ${ColorMap.TX_WHITE};
    background: none;

    &::after {
      left: 0;
    }
  }
`;
