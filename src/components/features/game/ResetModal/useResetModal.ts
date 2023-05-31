import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameDomainService, GameResult } from '~/domains';
import { resetGame } from '~/store';
import type { RootState } from '~/store';

export const useResetModal = (): {
  gameResult: GameResult;
  handleResetGame: () => void;
} => {
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game);

  const gameResult = useMemo(() => GameDomainService.getResult(game), [game]);

  const handleResetGame = useCallback(() => {
    dispatch(resetGame());
  }, [dispatch]);

  return { gameResult, handleResetGame };
};
