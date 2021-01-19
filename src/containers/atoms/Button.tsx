import React from 'react';
import Button from 'src/components/atoms/Button';

interface EnhancedButtonProps {
  onClick: () => void;
  text: string;
}
const EnhancedButton: React.FC<EnhancedButtonProps> = ({ onClick, text }) => {
  return <Button onClick={onClick}>{text}</Button>;
};
export default EnhancedButton;
