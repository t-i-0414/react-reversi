import React, { useState } from 'react';
import Game from 'src/components/pages/Game';
import Button from 'src/containers/atoms/Button';
import Board from 'src/containers/organisms/Board';

const EnhancedGame: React.FC = () => {
  const [isGameStartFlg, setGameStart] = useState(false);

  return (
    <Game>
      {isGameStartFlg ? (
        <Board onSideSquares={8} dataCy="board" />
      ) : (
        <Button
          onClick={() => {
            setGameStart(true);
          }}
          text="Game Start"
          dataCy="start"
        />
      )}
    </Game>
  );
};

export default EnhancedGame;
