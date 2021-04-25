import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGameStartFlg,
  initializeBoard,
  updateCurrentPlayer,
} from 'src/redux/modules/game';
import Const from 'src/const';

const { PlayerVal } = Const;

const useGame = (): {
  isGameStart: boolean;
  startGame: (sideSquaresCount: number) => void;
} => {
  const dispatch = useDispatch();

  const { isGameStart } = useSelector((state: Store) => state.game);

  useEffect(() => {
    dispatch(setGameStartFlg(false));
  }, [dispatch]);

  const startGame = (sideSquaresCount: number) => {
    dispatch(setGameStartFlg(true));
    dispatch(initializeBoard(sideSquaresCount));
    dispatch(updateCurrentPlayer(PlayerVal.BLACK));
  };

  return {
    isGameStart,
    startGame,
  };
};
export default useGame;
