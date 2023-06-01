import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { GameDomainService } from '~/domains';
import type { PieceColor, PlayerInformation } from '~/domains';
import type { RootState } from '~/store';

export const useScore = (): {
  currentTurnPiece: PieceColor;
  blackPiecePlayerInformation: PlayerInformation;
  whitePiecePlayerInformation: PlayerInformation;
} => {
  const game = useSelector((store: RootState) => store.game);
  const score = useMemo(() => GameDomainService.getScore(game), [game]);

  return score;
};
