import { useSelector } from 'react-redux';
import Const from 'src/const';

const { Player } = Const;

const useScore = (): UnionVal<typeof Player> => {
  const { currentPlayer } = useSelector((store: Store) => store.game);

  return currentPlayer;
};

export default useScore;
