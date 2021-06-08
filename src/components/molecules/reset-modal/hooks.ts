import { useDispatch, useSelector } from 'react-redux';
import { clearState } from 'src/redux/modules/game';

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
    if (white.score > black.score) return `${white.player.name} win!`;
    if (black.score > white.score) return `${black.player.name} win!`;

    return 'Draw!';
  })();

  return { onReset, gameResultText };
};
