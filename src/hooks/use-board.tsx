import { BoardState, SquareState, PlayerValType } from '../types';

// 渡された配列からひっくり返すべきマスを取得するメソッド
export default (
  baseSquare: SquareState,
  board: BoardState,
  onSideSquares: number,
  currentPlayerVal: PlayerValType,
): SquareState[] => {
  const aroundSquareArrays: Array<SquareState[]> = [];

  // 起点となるマスから盤面の左方向のマスを配列として取得
  aroundSquareArrays.push(
    board
      .filter((square) => {
        return !!(
          square.row === baseSquare.row && square.column < baseSquare.column
        );
      })
      .reverse(),
  ); // クリックされたマスを起点としたいためreverseをかける

  // 起点となるマスから盤面の右方向のマスを配列として取得
  aroundSquareArrays.push(
    board.filter((square) => {
      return !!(
        square.row === baseSquare.row && square.column > baseSquare.column
      );
    }),
  );

  // 起点となるマスから盤面の上方向のマスを配列として取得
  aroundSquareArrays.push(
    board
      .filter((square) => {
        return !!(
          square.row < baseSquare.row && square.column === baseSquare.column
        );
      })
      .reverse(),
  ); // クリックされたマスを起点としたいためreverseをかける

  // 起点となるマスから盤面の下方向のマスを配列として取得
  aroundSquareArrays.push(
    board.filter((square) => {
      return !!(
        square.row > baseSquare.row && square.column === baseSquare.column
      );
    }),
  );

  // 起点となるマスから盤面の左斜上方向のマスを配列として取得
  const upperLeftDiagonalSideSquareArray: SquareState[] = [];
  for (let count = 1; count < onSideSquares; count += 1) {
    const squareId: number = baseSquare.id - onSideSquares * count - count;
    if (squareId >= 0 && squareId < board.length) {
      upperLeftDiagonalSideSquareArray.push(board[squareId]);
    }
  }
  aroundSquareArrays.push(upperLeftDiagonalSideSquareArray);

  // 起点となるマスから盤面の右斜上方向のマスを配列として取得
  const upperRightDiagonalSideSquareArray: SquareState[] = [];
  for (let count = 1; count < onSideSquares; count += 1) {
    const squareId: number = baseSquare.id - onSideSquares * count + count;
    if (squareId > 0 && squareId < board.length) {
      upperRightDiagonalSideSquareArray.push(board[squareId]);
    }
  }
  aroundSquareArrays.push(upperRightDiagonalSideSquareArray);

  // 起点となるマスから盤面の左斜下方向のマスを配列として取得

  const lowerLeftDiagonalSideSquareArray: SquareState[] = [];
  for (let count = 1; count < onSideSquares; count += 1) {
    const squareId: number = baseSquare.id + onSideSquares * count - count;
    if (squareId >= 0 && squareId < board.length - 1) {
      lowerLeftDiagonalSideSquareArray.push(board[squareId]);
    }
  }
  aroundSquareArrays.push(lowerLeftDiagonalSideSquareArray);

  // 起点となるマスから盤面の右斜下方向のマスを配列として取得
  const lowerRightDiagonalSideSquareArray: SquareState[] = [];
  for (let count = 1; count < onSideSquares; count += 1) {
    const squareId: number = baseSquare.id + onSideSquares * count + count;
    if (squareId >= 0 && squareId < board.length) {
      lowerRightDiagonalSideSquareArray.push(board[squareId]);
    }
  }
  aroundSquareArrays.push(lowerRightDiagonalSideSquareArray);

  const shouldReverseSquareArray: SquareState[] = [];
  aroundSquareArrays.forEach((squareArray) => {
    const emptySquareIndex: number = squareArray.findIndex(
      (square) => square.val === 0,
    );
    if (emptySquareIndex !== -1) {
      squareArray.splice(emptySquareIndex, squareArray.length);
    }

    const endpointSquareIndex: number = squareArray.findIndex(
      (square) => square.val === currentPlayerVal,
    );
    squareArray.splice(Math.max(0, endpointSquareIndex), squareArray.length);

    shouldReverseSquareArray.push(...squareArray);
  });

  return shouldReverseSquareArray;
};
