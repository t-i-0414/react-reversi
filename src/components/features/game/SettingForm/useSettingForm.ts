import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BoardDomainService } from '~/domains';
import { startGame } from '~/store';
import type { SettingFormInputs } from './SettingForm';

const useSettingForm = (): {
  handleStartGame: (data: SettingFormInputs) => void;
} => {
  const dispatch = useDispatch();

  const handleStartGame = useCallback(
    () =>
      ({
        numberOfSquaresPerSideOfBoard,
        blackPiecePlayerName,
        whitePiecePlayerName,
        firstTurnPiece,
      }: SettingFormInputs) => {
        const board = BoardDomainService.createBoard({
          numberOfSquaresPerSideOfBoard,
          firstTurnPiece,
        });

        dispatch(
          startGame({
            board,
            blackPiecePlayer: { name: blackPiecePlayerName },
            whitePiecePlayer: { name: whitePiecePlayerName },
            currentTurnPiece: firstTurnPiece,
          }),
        );
      },
    [dispatch],
  );

  return { handleStartGame };
};

export default useSettingForm;
