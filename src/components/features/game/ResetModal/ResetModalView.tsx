import React from 'react';
import styled from 'styled-components';
import { Button } from '~/components/features/game/Button';
import { ColorMap, SizeMap } from '~/constants';

type Props = {
  resultText: string;
  onResetGame: () => void;
};

export const ResetModalView: React.FC<Props> = ({
  resultText,
  onResetGame,
}) => (
  <OverLay>
    <Wrapper>
      <Title>Game Result</Title>
      <Result>{resultText}</Result>
      <ButtonWrapper>
        <Button
          text='Game Reset'
          type='submit'
          dataCy='reset'
          onClick={onResetGame}
        />
      </ButtonWrapper>
    </Wrapper>
  </OverLay>
);

export default ResetModalView;

const OverLay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${ColorMap.BG_BLACK_ALPHA30};
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 480px;
  padding: 32px 24px;
  background-color: ${ColorMap.BG_WHITE};
  border-radius: 24px;
  box-shadow: 0 0 13px 5px rgb(0 0 0 / 15%);
`;

const Title = styled.p`
  margin: 0 0 16px;
  font-size: ${SizeMap.FS_24};
  font-weight: bold;
  color: ${ColorMap.TX_DEEP_BLACK};
  text-align: center;
  word-break: break-word;
`;

const Result = styled.p`
  margin-bottom: 32px;
  font-size: ${SizeMap.FS_20};
  font-weight: bold;
  text-align: center;
  word-break: break-word;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
