import React from 'react';
import { ResetModalView } from './ResetModalView';
import { useResetModal } from './useResetModal';

export const ResetModalContainer: React.FC = () => {
  const { handleResetGame, gameResult } = useResetModal();
  const resultText = gameResult.isDraw
    ? 'Draw!'
    : `${gameResult.winner.name} Win!`;

  return (
    <ResetModalView resultText={resultText} onResetGame={handleResetGame} />
  );
};
