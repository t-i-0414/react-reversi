import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGameStartFlg,
  setTotalBoardStates,
  updateCurrentPlayer,
} from 'src/redux/modules/game';
import Const from 'src/const';

const { PlayerVal } = Const;

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
    dispatch(setTotalBoardStates(sideSquaresCount));
    dispatch(updateCurrentPlayer(PlayerVal.BLACK));
  };

  const { isGameStart } = useSelector((state: StoreState) => state.game);

  return {
    isGameStart,
    onGameStart,
  };
};
export default useGame;
