import { useSelector } from 'react-redux';
import Const from 'src/const';

const { PieceColor } = Const;

const useScore = (): {
  currentPlayer: UnionVal<typeof PieceColor>;
  score: Store['game']['score'];
} => {
  const { currentPlayer, score } = useSelector((store: Store) => store.game);

  return { currentPlayer, score };
};

export default useScore;
