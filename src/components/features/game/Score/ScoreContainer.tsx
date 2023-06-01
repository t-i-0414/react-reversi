import React from 'react';
import { ScoreView } from './ScoreView';
import { useScore } from './useScore';

export const ScoreContainer: React.FC = () => {
  const {
    currentTurnPiece,
    blackPiecePlayerInformation,
    whitePiecePlayerInformation,
  } = useScore();

  return (
    <ScoreView
      currentTurnPiece={currentTurnPiece}
      blackPiecePlayerInformation={blackPiecePlayerInformation}
      whitePiecePlayerInformation={whitePiecePlayerInformation}
    />
  );
};
