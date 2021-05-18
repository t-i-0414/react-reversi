import { useDispatch } from 'react-redux';
import {
  updateGameStartFlg,
  initializeBoard,
  updateCurrentPlayer,
  countScore,
} from 'src/redux/modules/game';
import Const from 'src/const';

const { Player, PieceColor } = Const;

// comments..
const useSettingForm = (): {
  startGame: (sideSquaresCount: number) => void;
} => {
  const dispatch = useDispatch();

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

  return { startGame };
};

export default useSettingForm;
