import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '~/redux/modules/game';
import type { Store } from '~/types';

export default (): {
  onReset: () => void;
  gameResultText: string;
} => {
  const dispatch = useDispatch();
  const {
    players: { white, black },
  } = useSelector((state: Store) => state.game);

  const onReset = () => {
    dispatch(clearState());
  };

  const gameResultText = (() => {
    if (white.score > black.score) return `${white.name} win!`;
    if (black.score > white.score) return `${black.name} win!`;

    return 'Draw!';
  })();

  return { onReset, gameResultText };
};
