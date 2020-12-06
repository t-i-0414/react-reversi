import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toWhite } from '../../actions';

interface PieceProps {
  color: string;
  display: 'none' | 'block';
}
type PieceStyle = {
  color: string;
  display: 'none' | 'block';
};

const Piece: React.FC<PieceProps> = ({ color, display }) => {
  // const board = useSelector<State, BoardState>((state) => state.board);
  const dispatch = useDispatch();

  return (
    <StyledPiece
      color={color}
      display={display}
      onClick={() => {
        dispatch(toWhite(1));
      }}
    />
  );
};

const StyledPiece = styled.span<PieceStyle>`
  display: ${(props) => props.display};
  width: 80%;
  height: 80%;
  background-color: ${(props) => props.color};
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`;

export default Piece;
