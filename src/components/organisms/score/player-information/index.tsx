import React from 'react';
import Const from 'src/const';
import styled from 'styled-components';
import Piece from 'src/components/atoms/piece';

const { Size, PieceColor } = Const;

interface PlayerInformationProps {
  pieceColor: UnionVal<typeof PieceColor>;
  score: number;
}
const PlayerInformation: React.FC<PlayerInformationProps> = ({
  pieceColor,
  score,
}) => {
  return (
    <Wrapper>
      {pieceColor === PieceColor.WHITE && (
        <Inner>
          <Piece pieceColor={PieceColor.WHITE} />
        </Inner>
      )}

      <Score>{score}</Score>

      {pieceColor === PieceColor.BLACK && (
        <Inner>
          <Piece pieceColor={PieceColor.BLACK} />
        </Inner>
      )}
    </Wrapper>
  );
};

export default PlayerInformation;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

const Score = styled.span`
  display: block;
  font-size: ${Size.FS_24};
`;
