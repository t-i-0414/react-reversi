import { useSelector } from 'react-redux';
import { GameDomainService } from '~/domains';
import { RootState } from '~/store';

export const useGame = (): {
  isGameStarted: boolean;
  isGameFinished: boolean;
} => {
  const game = useSelector((store: RootState) => store.game);

  const isGameFinished = GameDomainService.isGameFinished(game);

  return {
    isGameStarted: game.isStarted,
    isGameFinished,
  };
};
