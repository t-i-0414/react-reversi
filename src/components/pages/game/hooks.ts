import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  // add comment.

  updateGameStartFlg,
  initializeBoard,
  updateCurrentPlayer,
  countScore,
} from 'src/redux/modules/game';
import Const from 'src/const';

const { Player, PieceColor } = Const;

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
    dispatch(
      updateCurrentPlayer({
        player: Player.PLAYER_2,
        pieceColor: PieceColor.BLACK,
      }),
    );
    dispatch(countScore());
  };

  return {
    isGameStart,
    startGame,
  };
};
export default useGame;
