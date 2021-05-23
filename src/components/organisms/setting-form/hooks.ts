import { useDispatch } from 'react-redux';
import {
  updateGameStartFlg,
  initializeBoard,
  updatePlayers,
  countScore,
} from 'src/redux/modules/game';
import Const from 'src/const';

const { Player, PieceColor } = Const;
export interface Inputs {
  sideSquaresCount: number;
  blackPiecePlayer: string;
  whitePiecePlayer: string;
}

const useSettingForm = (): {
  startGame: (data: Inputs) => void;
} => {
  const dispatch = useDispatch();

  const startGame = (data: Inputs) => {
    dispatch(
      updatePlayers({
        black: {
          player: Player[data.blackPiecePlayer],
          pieceColor: PieceColor.BLACK,
          current: true,
          score: 0,
        },
        white: {
          player: Player[data.whitePiecePlayer],
          pieceColor: PieceColor.WHITE,
          current: false,
          score: 0,
        },
      }),
    );

    dispatch(initializeBoard(data.sideSquaresCount));

    dispatch(countScore());

    dispatch(updateGameStartFlg(true));
  };

  return { startGame };
};

export default useSettingForm;
