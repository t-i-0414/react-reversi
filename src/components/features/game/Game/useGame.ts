import { useSelector } from 'react-redux';
import { RootState } from '~/store';

export const useGame = (): {
  isGameStarted: boolean;
} => {
  const isGameStarted = useSelector((store: RootState) => store.game.isStarted);

  return {
    isGameStarted,
  };
};
