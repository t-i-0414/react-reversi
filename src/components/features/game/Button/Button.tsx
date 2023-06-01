import React from 'react';
import styled from 'styled-components';
import { ColorMap, SizeMap } from '~/constants';

export interface Props {
  text: string;
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  dataCy?: string;
  dataTestid?: string;
}

export const Button: React.FC<Props> = ({
  text,
  type,
  onClick,
  dataCy,
  dataTestid,
}) => (
  <StyledBottom
    type={type}
    onClick={onClick}
    data-cy={dataCy}
    data-testid={dataTestid}
  >
    {text}
  </StyledBottom>
);

export const StyledBottom = styled.button`
  position: relative;
  z-index: 0;
  display: block;
  padding: 8px 16px;

  /* margin: 0 auto; */
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
