import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateGameStartFlg,
  initializeBoard,
  updateCurrentPlayer,
  countScore,
} from 'src/redux/modules/game';
import Const from 'src/const';

const { Player } = Const;

const useGame = (): {
  isGameStart: boolean;
  startGame: (sideSquaresCount: number) => void;
} => {
  const dispatch = useDispatch();

  const { isGameStart } = useSelector((store: Store) => store.game);

  useEffect(() => {
    dispatch(updateGameStartFlg(false));
  }, [dispatch]);

  const startGame = (sideSquaresCount: number) => {
    dispatch(updateGameStartFlg(true));
    dispatch(initializeBoard(sideSquaresCount));
    dispatch(updateCurrentPlayer(Player.BLACK));
    dispatch(countScore());
  };

  return {
    isGameStart,
    startGame,
  };
};
export default useGame;
