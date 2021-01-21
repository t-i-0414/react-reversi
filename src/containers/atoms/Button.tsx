import React from 'react';
import Button, { ButtonProp } from 'src/components/atoms/Button';

interface EnhancedButtonProp extends ButtonProp {
  text: string;
}
const EnhancedButton: React.FC<EnhancedButtonProp> = ({
  onClick,
  text,
  dataCy,
}) => {
  return (
    <Button onClick={onClick} dataCy={dataCy}>
      {text}
    </Button>
  );
};
export default EnhancedButton;
