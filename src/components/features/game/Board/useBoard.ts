import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BoardDomainService, GameDomainService } from '~/domains';
import type { Square } from '~/domains';
import type { RootState } from '~/store';
import { updateBoard, changeCurrentTurnPiece } from '~/store';

export const useBoard = () => {
  const dispatch = useDispatch();
  const { board, currentTurnPiece } = useSelector(
    (store: RootState) => store.game,
  );

  const handlePlacePiece = useCallback(
    (square: Square) => {
      const squaresHavingCanTurnOverPieceByEachDirection: Square[] =
        BoardDomainService.getSquaresHavingCanTurnOverPieceByEachDirection({
          board,
          baseSquare: square,
          currentTurnPiece,
        });

      if (squaresHavingCanTurnOverPieceByEachDirection.length > 0) {
        const boardAfterTurningOverPieces = BoardDomainService.turnOverPieces({
          board,
          targetSquares: [
            square,
            ...squaresHavingCanTurnOverPieceByEachDirection,
          ],
          currentTurnPiece,
        });

        const nextTurnPiece =
          GameDomainService.getNextTurnPiece(currentTurnPiece);

        const nextBoard = BoardDomainService.updateBoardByNextTurnPiece({
          board: boardAfterTurningOverPieces,
          nextTurnPiece,
        });

        dispatch(changeCurrentTurnPiece({ pieceColor: nextTurnPiece }));
        dispatch(updateBoard({ board: nextBoard }));
      }
    },
    [currentTurnPiece, board, dispatch],
  );

  return {
    board,
    handlePlacePiece,
  };
};
