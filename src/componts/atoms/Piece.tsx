import React from 'react';
import styled from 'styled-components';
import Const from '../../const';

const { Color } = Const;

interface Props {
  color: string;
}
export default (props: Props) => {
  return <StyledPiece {...props} ></StyledPiece>;
};

const StyledPiece = styled.span<Pick<Props, "color">>`
  ${(props) => getPieceColor(props.color)}
  border-radius: 50%;
  display: block;
  height: 80%;
  width: 80%;

  &:hover {
    cursor: pointer;
  }
`;

const getPieceColor = (color: string): string => {
  switch (color) {
    case "white":
      return `background-color: ${Color.PC_WHITE};`
    case "black":
      return `background-color: ${ Color.PC_BLACK };`
    default:
      return `background-color: ${Color.BG_GREEN};`
  }
}
