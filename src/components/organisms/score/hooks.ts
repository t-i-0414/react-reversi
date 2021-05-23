import { useSelector } from 'react-redux';

const useScore = (): {
  players: Store['game']['players'];
  currentPlayer: GamePlayer;
  score: {
    white: number;
    black: number;
  };
} => {
  const { players } = useSelector((store: Store) => store.game);

  const currentPlayerIndex = Object.entries(players).find(
    ([_id, player]) => player.current === true,
  )?.[0] as UnionVal<PieceColorType>;
  const currentPlayer = players[currentPlayerIndex];

  const score = {
    white: players.white.score,
    black: players.black.score,
  };

  return { players, currentPlayer, score };
};

export default useScore;
