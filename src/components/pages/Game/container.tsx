import React, { useState } from 'react';
import Game, { GameProp } from 'src/components/pages/Game/component';
import Button from 'src/components/atoms/Button/container';
import Board from 'src/components/organisms/Board/container';

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
