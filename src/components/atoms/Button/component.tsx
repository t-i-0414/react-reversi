import React from 'react';
import styled from 'styled-components';
import Const from 'src/const';

const { Color } = Const;

export interface ButtonProp {
  onClick: () => void;
  dataCy: string;
}
const Button: React.FC<ButtonProp> = ({ children, onClick, dataCy }) => {
  return (
    <StyledBottun type="button" onClick={onClick} data-cy={dataCy}>
      {children}
    </StyledBottun>
  );
};
export default Button;

const StyledBottun = styled.button`
  position: relative;
  display: block;
  padding: 8px 16px;
  margin: 0 auto;
  overflow: hidden;
  background: none;
  border: 1px solid ${Color.BD_BLACK};
  border-radius: 4px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    content: '';
    background-color: ${Color.BG_WHITE};
  }

  &::after {
    position: absolute;
    top: 0;
    left: -100%;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background-color: ${Color.BG_BLACK};
    transition: all 0.3s ease-out;
  }

  &:hover {
    color: ${Color.TX_WHITE};
    background: none;

    &::after {
      left: 0;
    }
  }
`;