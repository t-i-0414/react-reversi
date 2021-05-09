import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/atoms/button';
import Board from 'src/components/organisms/board';
import Information from 'src/components/organisms/score';
import Const from 'src/const';
import { useForm } from 'react-hook-form';
import useGame from './hooks';

const { Color } = Const;

interface Inputs {
  sideSquaresCount: number;
}

export interface GameProps {
  dataCy: string;
}
const Game: React.FC<GameProps> = ({ dataCy }) => {
  const { isGameStart, startGame } = useGame();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = handleSubmit((data: Inputs) =>
    startGame(data.sideSquaresCount),
  );

  return (
    <StyledGameWrapper data-cy={dataCy}>
      {isGameStart ? (
        <>
          <Board dataCy="board" />
          <Information />
        </>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <input {...register('sideSquaresCount', { required: true })} />
            {errors.sideSquaresCount && <span>This field is required</span>}

            <Button text="Game Start" type="submit" dataCy="start" />
          </form>
        </>
      )}
    </StyledGameWrapper>
  );
};

const StyledGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 992px;
  height: 768px;
  margin: 0 auto;
  color: ${Color.TX_BLACK};
`;

export default Game;
