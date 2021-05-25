import React from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import Button from 'src/components/atoms/button';
import Const from 'src/const';
import useSettingForm, { SettingFormInputs } from './hooks';

const { Color, Size } = Const;

const { Player } = Const;

const SettingForm: React.FC = () => {
  const { startGame } = useSettingForm();

  const { register, getValues, handleSubmit, control } = useForm<
    SettingFormInputs
  >({
    defaultValues: {
      sideSquaresCount: 8,
      blackPiecePlayer: 'PLAYER_1',
      whitePiecePlayer: 'PLAYER_2',
    },
  });

  const onSubmit = handleSubmit((data: SettingFormInputs) => startGame(data));

  return (
    <Wrapper>
      <FormTitle>Game config</FormTitle>
      <StyledForm onSubmit={onSubmit}>
        <Controller
          control={control}
          name="sideSquaresCount"
          render={({ field: { onChange, value } }) => (
            <FieldWrapper>
              <StyledLabel>Squares on board&apos;s one side</StyledLabel>
              <FieldContainer>
                <StyledRange
                  type="range"
                  value={value}
                  min="4"
                  max="16"
                  step="2"
                  data-cy="input-sideSquaresCount"
                  onChange={onChange}
                />
                <RangeValue>{getValues('sideSquaresCount')}</RangeValue>
              </FieldContainer>
            </FieldWrapper>
          )}
        />

        <FieldWrapper>
          <StyledLabel>Black piece player</StyledLabel>
          <FieldContainer>
            <StyledSelect>
              <select {...register('blackPiecePlayer')}>
                <option value="PLAYER_1">{Player.PLAYER_1.name}</option>
                <option value="PLAYER_2">{Player.PLAYER_2.name}</option>
              </select>
            </StyledSelect>
          </FieldContainer>
        </FieldWrapper>

        <FieldWrapper>
          <StyledLabel>White piece player</StyledLabel>
          <FieldContainer>
            <StyledSelect>
              <select {...register('whitePiecePlayer')}>
                <option value="PLAYER_1">{Player.PLAYER_1.name}</option>
                <option value="PLAYER_2">{Player.PLAYER_2.name}</option>
              </select>
            </StyledSelect>
          </FieldContainer>
        </FieldWrapper>

        <Button text="Game Start" type="submit" dataCy="start" />
      </StyledForm>
    </Wrapper>
  );
};

export default SettingForm;

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 480px;
  padding: 32px 24px;
  border-radius: 24px;
  box-shadow: 0 0 13px 5px rgba(0, 0, 0, 0.15);
`;

const FormTitle = styled.p`
  margin: 0 0 16px;
  font-size: ${Size.FS_24};
  font-weight: bold;
  color: ${Color.TX_DEEP_BLACK};
  text-align: center;
`;

const StyledForm = styled.form`
  margin: 0;
`;

const FieldWrapper = styled.div`
  box-sizing: border-box;
  padding: 24px 8px;
  margin: 0;
  border-top: 1px solid ${Color.BG_LIGHT_GRAY};

  &:last-of-type {
    margin-bottom: 40px;
    border-bottom: 1px solid ${Color.BG_LIGHT_GRAY};
  }
`;

const StyledLabel = styled.label`
  display: block;
  margin: 0 0 12px;
  font-size: ${Size.FS_16};
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
  background-color: ${Color.BG_LIGHT_GRAY};

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
    background-color: ${Color.BG_LIGHT_BLACK};
    border: none;
    border-radius: 50%;
  }
`;

const RangeValue = styled.span`
  display: block;
  margin: 0 0 0 8px;
  font-size: ${Size.FS_20};
`;

const StyledSelect = styled.div`
  position: relative;
  width: 90%;
  margin: 0;
  overflow: hidden;
  text-align: center;
  background: ${Color.BG_WHITE};
  border-radius: 1em;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.15);

  &::before {
    position: absolute;
    top: 0.8em;
    right: 0.8em;
    width: 0;
    height: 0;
    padding: 0;
    pointer-events: none;
    content: '';
    border-top: 6px solid ${Color.BD_LIGHT_GRAY};
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
  }

  select {
    width: 100%;
    padding: 8px 1em 8px 8px;
    color: ${Color.TX_BLACK};
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
