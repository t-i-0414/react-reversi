import { useSelector } from 'react-redux';

const useScore = (): {
  currentPlayer: GamePlayer;
  score: Store['game']['score'];
} => {
  const { currentPlayer, score } = useSelector((store: Store) => store.game);

  return { currentPlayer, score };
};

export default useScore;
