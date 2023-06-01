import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { Button } from '~/components/features/game/Button';
import { ColorMap, SizeMap } from '~/constants';
import type { PieceColor } from '~/domains';
import useSettingForm from './useSettingForm';

export type SettingFormInputs = {
  numberOfSquaresPerSideOfBoard: number;
  blackPiecePlayerName: string;
  whitePiecePlayerName: string;
  firstTurnPiece: PieceColor;
};

export const SettingForm: React.FC = () => {
  const { handleStartGame } = useSettingForm();

  const {
    control,
    formState: { errors },
    register,
    getValues,
    setError,
    handleSubmit,
  } = useForm<SettingFormInputs>({
    defaultValues: {
      numberOfSquaresPerSideOfBoard: 8,
      blackPiecePlayerName: 'Player1',
      whitePiecePlayerName: 'Player2',
      firstTurnPiece: 'black',
    },
  });

  useEffect(() => {
    const blackPiecePlayerName = getValues('blackPiecePlayerName');
    const whitePiecePlayerName = getValues('whitePiecePlayerName');

    if (blackPiecePlayerName === whitePiecePlayerName) {
      setError('blackPiecePlayerName', {
        type: 'validate',
      });
      setError('whitePiecePlayerName', {
        type: 'validate',
      });
    }
  }, [getValues, setError]);

  return (
    <Wrapper data-cy='setting-form'>
      <FormTitle>Game Config</FormTitle>

      <StyledForm
        onSubmit={handleSubmit((data: SettingFormInputs) => {
          handleStartGame(data);
        })}
      >
        <Controller
          control={control}
          name='numberOfSquaresPerSideOfBoard'
          render={({ field: { value, onChange } }) => (
            <FieldWrapper>
              <StyledLabel>Number of Squares per Side of the Board</StyledLabel>

              <FieldContainer>
                <StyledRange
                  type='range'
                  value={value}
                  min='4'
                  max='16'
                  step='2'
                  data-cy='input-numberOfSquaresPerSideOfBoard'
                  data-testid='input-numberOfSquaresPerSideOfBoard'
                  onChange={onChange}
                />

                <RangeValue>
                  {getValues('numberOfSquaresPerSideOfBoard')}
                </RangeValue>
              </FieldContainer>
            </FieldWrapper>
          )}
        />

        <FieldWrapper>
          <StyledLabel>Black Piece Player Name</StyledLabel>

          <FieldContainer>
            <StyledInput
              placeholder='Input player name'
              data-testid='input-blackPiecePlayerName'
              data-cy='input-blackPiecePlayerName'
              {...register('blackPiecePlayerName', {
                required: true,
                maxLength: 10,
                validate: value => value !== getValues('whitePiecePlayerName'),
              })}
            />
          </FieldContainer>

          {errors.blackPiecePlayerName?.type === 'required' && (
            <ErrorMessage
              role='alert'
              data-testid='black-piece-player-name-required-error'
            >
              Black Piece Player Name is required
            </ErrorMessage>
          )}
          {errors.blackPiecePlayerName?.type === 'maxLength' && (
            <ErrorMessage
              role='alert'
              data-testid='black-piece-player-name-max-length-error'
            >
              Piece Player Name is too long(max length is 10 characters)
            </ErrorMessage>
          )}
          {errors.blackPiecePlayerName?.type === 'validate' && (
            <ErrorMessage
              role='alert'
              data-testid='black-piece-player-name-same-name-error'
            >
              The same player name has been inputted. Please input a unique
              player name.
            </ErrorMessage>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <StyledLabel>White Piece Player Name</StyledLabel>

          <FieldContainer>
            <StyledInput
              placeholder='Input player name'
              data-testid='input-whitePiecePlayerName'
              data-cy='input-whitePiecePlayerName'
              {...register('whitePiecePlayerName', {
                required: true,
                maxLength: 10,
                validate: value => value !== getValues('blackPiecePlayerName'),
              })}
            />
          </FieldContainer>

          {errors.whitePiecePlayerName?.type === 'required' && (
            <ErrorMessage
              role='alert'
              data-testid='white-piece-player-name-required-error'
            >
              White Piece Player Name is required
            </ErrorMessage>
          )}
          {errors.whitePiecePlayerName?.type === 'maxLength' && (
            <ErrorMessage
              role='alert'
              data-testid='white-piece-player-name-max-length-error'
            >
              Player Name is too long(max length is 10 characters)
            </ErrorMessage>
          )}
          {errors.whitePiecePlayerName?.type === 'validate' && (
            <ErrorMessage
              role='alert'
              data-testid='white-piece-player-name-same-name-error'
            >
              The same player name has been inputted. Please input a unique
              player name.
            </ErrorMessage>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <StyledLabel>First Turn Piece</StyledLabel>

          <FieldContainer>
            <SelectInner>
              <select
                {...register('firstTurnPiece')}
                data-testid='select-firstTurnPiece'
              >
                <option value='black'>black</option>
                <option value='white'>white</option>
              </select>
            </SelectInner>
          </FieldContainer>
        </FieldWrapper>

        <ButtonWrapper>
          <Button
            text='Start Game'
            type='submit'
            dataCy='start-game'
            dataTestid='start-game'
          />
        </ButtonWrapper>
      </StyledForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 480px;
  padding: 32px 24px;
  margin: 48px auto 0;
  color: ${ColorMap.TX_BLACK};
  border-radius: 24px;
  box-shadow: 0 0 13px 5px rgb(0 0 0 / 15%);
`;

const FormTitle = styled.p`
  margin: 0 0 16px;
  font-size: ${SizeMap.FS_24};
  font-weight: bold;
  color: ${ColorMap.TX_DEEP_BLACK};
  text-align: center;
`;

const StyledForm = styled.form`
  margin: 0;
`;

const FieldWrapper = styled.div`
  box-sizing: border-box;
  padding: 24px 8px;
  margin: 0;
  border-top: 1px solid ${ColorMap.BG_LIGHT_GRAY};

  &:last-of-type {
    margin-bottom: 40px;
    border-bottom: 1px solid ${ColorMap.BG_LIGHT_GRAY};
  }
`;

const StyledLabel = styled.label`
  display: block;
  margin: 0 0 12px;
  font-size: ${SizeMap.FS_16};
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

const StyledRange = styled.input`
  display: block;
  width: 280px;
  height: 2px;
  appearance: none;
  background-color: ${ColorMap.BG_LIGHT_GRAY};

  &:focus,
  &:active {
    outline: none;
  }

  &::-webkit-slider-thumb {
    position: relative;
    display: block;
    appearance: none;
    width: 12px;
    height: 12px;
    cursor: pointer;
    background-color: ${ColorMap.BG_LIGHT_BLACK};
    border: none;
    border-radius: 50%;
  }
`;

const RangeValue = styled.span`
  display: block;
  margin: 0 0 0 8px;
  font-size: ${SizeMap.FS_20};
`;

const StyledInput = styled.input`
  padding: 6px 12px;
  font-size: ${SizeMap.FS_16};
  color: ${ColorMap.TX_BLACK};
  border: 1px solid ${ColorMap.BD_LIGHT_GRAY};
  border-radius: 10px;
`;

const SelectInner = styled.div`
  position: relative;
  width: 80px;
  padding: 0 4px;
  margin: 0;
  overflow: hidden;
  text-align: center;
  background: ${ColorMap.BG_WHITE};
  border-radius: 1em;
  box-shadow: 0 0 6px 1px rgb(0 0 0 / 15%);

  &::before {
    position: absolute;
    top: 0.8em;
    right: 0.8em;
    width: 0;
    height: 0;
    padding: 0;
    pointer-events: none;
    content: '';
    border-top: 6px solid ${ColorMap.BD_LIGHT_GRAY};
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
  }

  select {
    width: 100%;
    padding: 8px 1em 8px 8px;
    font-size: ${SizeMap.FS_16};
    color: ${ColorMap.TX_BLACK};
    text-overflow: ellipsis;
    cursor: pointer;
    background: transparent;
    background-image: none;
    border: none;
    outline: none;
    box-shadow: none;
    appearance: none;

    &::-ms-expand {
      display: none;
    }
  }
`;

const ErrorMessage = styled.p`
  margin: 12px 0 0;
  color: ${ColorMap.TX_RED};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
