import React from 'react';
import { BoardView } from './BoardView';
import { useBoard } from './useBoard';

export const BoardContainer: React.FC = () => {
  const { board, handlePlacePiece } = useBoard();

  return <BoardView board={board} onPlacePiece={handlePlacePiece} />;
};
