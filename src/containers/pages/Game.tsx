import React, { useState } from 'react';
import Game from 'src/components/pages/Game';
import Board from 'src/containers/organisms/Board';

const EnhancedGame: React.FC = () => {
  const [isGameStartFlg, setGameStart] = useState(true); // TODO:Set to false at releasing this app

  return (
    <Game>
      {!isGameStartFlg && (
        <button
          type="button"
          onClick={() => {
            setGameStart(true);
          }}
        >
          Game Start
        </button>
      )}
      {isGameStartFlg && <Board onSideSquares={8} />}
    </Game>
  );
};

export default EnhancedGame;
