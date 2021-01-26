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
  display: block;
  padding: 8px 16px;
  margin: 0 auto;
  background-color: ${Color.BG_WHITE};
  border: 1px solid ${Color.BD_BLACK};
  border-radius: 4px;
`;
