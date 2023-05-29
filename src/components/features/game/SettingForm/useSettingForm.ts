import { useDispatch, useSelector } from 'react-redux';
import { PlayerMap } from '~/const';
import {
  updateGameStartFlg,
  initializeBoard,
  updatePlayers,
  updateScore,
} from '~/redux/modules/game';
import type { Store } from '~/types';

export interface SettingFormInputs {
  sideSquaresCount: number;
  blackPiecePlayer: keyof Pick<typeof PlayerMap, 'PLAYER_1' | 'PLAYER_2'>;
  whitePiecePlayer: keyof Pick<typeof PlayerMap, 'PLAYER_1' | 'PLAYER_2'>;
}

const useSettingForm = (): {
  startGame: (data: SettingFormInputs) => void;
} => {
  // const dispatch = useDispatch();

  // const {
  //   players: { black, white },
  // } = useSelector((store: Store) => store.game);

  const startGame = (data: SettingFormInputs) => {
    // dispatch(
    //   updatePlayers({
    //     black: {
    //       ...black,
    //       ...PlayerMap[data.blackPiecePlayer],
    //     },
    //     white: {
    //       ...white,
    //       ...PlayerMap[data.whitePiecePlayer],
    //     },
    //   }),
    // );

    // dispatch(initializeBoard(data.sideSquaresCount));

    // dispatch(updateScore());

    // dispatch(updateGameStartFlg(true));
    console.log('startGame');
  };

  return { startGame };
};

export default useSettingForm;
