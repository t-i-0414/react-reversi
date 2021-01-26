import React, { useState } from 'react';
import Game, { GameProp } from 'src/components/pages/Game';
import Button from 'src/containers/atoms/Button';
import Board from 'src/containers/organisms/Board';

const EnhancedGame: React.FC<GameProp> = ({ dataCy }) => {
  const [isGameStartFlg, setGameStart] = useState(false);

  return (
    <Game dataCy={dataCy}>
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
