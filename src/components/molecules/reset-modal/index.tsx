import React from 'react';
import Const from 'src/const';
import styled from 'styled-components';
import Button from 'src/components/atoms/button';
import useResetModal from './hooks';

const { Color, Size } = Const;

const ResetModal: React.FC = () => {
  const { onReset, gameResultText } = useResetModal();

  return (
    <OverLay>
      <Wrapper>
        <Title>Game Result</Title>
        <Result>{gameResultText}</Result>
        <Button
          text="Game Reset"
          type="submit"
          dataCy="reset"
          onClick={onReset}
        />
      </Wrapper>
    </OverLay>
  );
};

export default ResetModal;

const OverLay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Color.BG_BLACK_ALPHA30};
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 480px;
  padding: 32px 24px;
  background-color: ${Color.BG_WHITE};
  border-radius: 24px;
  box-shadow: 0 0 13px 5px rgba(0, 0, 0, 0.15);
`;

const Title = styled.p`
  margin: 0 0 16px;
  font-size: ${Size.FS_24};
  font-weight: bold;
  color: ${Color.TX_DEEP_BLACK};
  text-align: center;
`;

const Result = styled.p`
  margin-bottom: 32px;
  font-size: ${Size.FS_20};
  font-weight: bold;
  text-align: center;
`;
