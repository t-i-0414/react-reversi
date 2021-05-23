import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from 'src/components/atoms/button';
import Const from 'src/const';
import useSettingForm, { Inputs } from './hooks';

const { Player } = Const;

const SettingForm: React.FC = () => {
  const { startGame } = useSettingForm();

  const { register, getValues, handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      sideSquaresCount: 8,
    },
  });

  const onSubmit = handleSubmit((data: Inputs) => startGame(data));

  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="sideSquaresCount"
        render={({ field: { onChange, value } }) => (
          <>
            <div>
              <span>Squares on board&apos;s one side:</span>
              <span>{getValues('sideSquaresCount')}</span>
            </div>
            <div>
              <input
                type="range"
                value={value}
                min="4"
                max="16"
                step="2"
                data-cy="input-sideSquaresCount"
                onChange={onChange}
              />
            </div>
          </>
        )}
      />

      <div>
        <span>Black piece player:</span>
      </div>
      <div>
        <select {...register('blackPiecePlayer')} value="PLAYER_1">
          <option value="PLAYER_1">{Player.PLAYER_1.name}</option>
          <option value="PLAYER_2">{Player.PLAYER_2.name}</option>
        </select>
      </div>

      <div>
        <span>White piece player:</span>
      </div>
      <div>
        <select {...register('whitePiecePlayer')} value="PLAYER_2">
          <option value="PLAYER_1">{Player.PLAYER_1.name}</option>
          <option value="PLAYER_2">{Player.PLAYER_2.name}</option>
        </select>
      </div>

      <Button text="Game Start" type="submit" dataCy="start" />
    </form>
  );
};

export default SettingForm;
