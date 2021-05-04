import { useSelector } from 'react-redux';
import Const from 'src/const';

const { Player } = Const;

const useScore = (): {
  currentPlayer: UnionVal<typeof Player>;
  score: Store['game']['score'];
} => {
  const { currentPlayer, score } = useSelector((store: Store) => store.game);

  return { currentPlayer, score };
};

export default useScore;
