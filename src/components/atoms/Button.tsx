import React from 'react';

export interface ButtonProp {
  onClick: () => void;
  dataCy: string;
}
const Button: React.FC<ButtonProp> = ({ children, onClick, dataCy }) => {
  return (
    <button type="button" onClick={onClick} data-cy={dataCy}>
      {children}
    </button>
  );
};
export default Button;
