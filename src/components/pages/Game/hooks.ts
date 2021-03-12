import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGameStartFlg, setBoardStates } from 'src/redux/modules/game';

const useGame = (): {
  isGameStart: boolean;
  onGameStart: (sideSquaresCount: number) => void;
} => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGameStartFlg(false));
  }, [dispatch]);

  const onGameStart = (sideSquaresCount: number) => {
    dispatch(setGameStartFlg(true));
    dispatch(setBoardStates(sideSquaresCount));
  };

  const isGameStart = useSelector(
    (state: StoreState) => state.game.isGameStart,
  );

  return {
    isGameStart,
    onGameStart,
  };
};
export default useGame;
