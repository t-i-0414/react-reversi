import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGameStartFlg } from 'src/redux/modules/game';

const useGame = (): {
  isGameStart: boolean;
} => {
  const dispatch = useDispatch();
  const { isGameStart } = useSelector((store: Store) => store.game);

  useEffect(() => {
    dispatch(updateGameStartFlg(false));
  }, [dispatch]);

  return {
    isGameStart,
  };
};
export default useGame;
