import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGameStartFlg } from 'src/redux/modules/game';

const useGame = (): {
  isGameStarted: boolean;
} => {
  const dispatch = useDispatch();
  const { isGameStarted } = useSelector((store: Store) => store.game);

  useEffect(() => {
    dispatch(updateGameStartFlg(false));
  }, [dispatch]);

  return {
    isGameStarted,
  };
};
export default useGame;
