import { useSelector } from 'react-redux';
import type { Store, GamePlayer } from '~/types';

const useScore = (): {
  players: Store['game']['players'];
  currentPlayersPieceColor: GamePlayer['pieceColor'];
  score: {
    white: number;
    black: number;
  };
} => {
  const { players } = useSelector((store: Store) => store.game);

  const currentPlayerIndex = Object.entries(players).find(
    ([_id, player]) => player.current === true,
  )?.[0] as keyof Store['game']['players'];
  const currentPlayersPieceColor = players[currentPlayerIndex].pieceColor;

  const score = {
    white: players.white.score,
    black: players.black.score,
  };

  return { players, currentPlayersPieceColor, score };
};

export default useScore;
