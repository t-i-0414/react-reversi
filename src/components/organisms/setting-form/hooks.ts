import { useDispatch, useSelector } from 'react-redux';
import {
  updateGameStartFlg,
  initializeBoard,
  updatePlayers,
  countScore,
} from 'src/redux/modules/game';
import Const from 'src/const';

const { Player } = Const;
export interface SettingFormInputs {
  sideSquaresCount: number;
  blackPiecePlayer: keyof Pick<typeof Player, 'PLAYER_1' | 'PLAYER_2'>;
  whitePiecePlayer: keyof Pick<typeof Player, 'PLAYER_1' | 'PLAYER_2'>;
}

const useSettingForm = (): {
  startGame: (data: SettingFormInputs) => void;
} => {
  const dispatch = useDispatch();

  const {
    players: { black, white },
  } = useSelector((store: Store) => store.game);

  const startGame = (data: SettingFormInputs) => {
    dispatch(
      updatePlayers({
        black: {
          ...black,
          player: Player[data.blackPiecePlayer],
        },
        white: {
          ...white,
          player: Player[data.whitePiecePlayer],
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
