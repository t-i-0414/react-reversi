import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from 'src/components/atoms/button';
import useSettingForm from './hooks';

interface Inputs {
  sideSquaresCount: number;
}

const SettingForm: React.FC = () => {
  const { startGame } = useSettingForm();

  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      sideSquaresCount: 8,
    },
  });

  const onSubmit = handleSubmit((data: Inputs) =>
    startGame(data.sideSquaresCount),
  );

  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="sideSquaresCount"
        render={({ field: { onChange, value } }) => (
          <>
            <label htmlFor="sideSquaresCount">
              sideSquaresCount：
              <input
                type="range"
                value={value}
                min="4"
                max="16"
                step="2"
                data-cy="input-sideSquaresCount"
                onChange={onChange}
              />
            </label>
            <span>{getValues('sideSquaresCount')}</span>
            {errors.sideSquaresCount && <span>This field is required</span>}
          </>
        )}
      />

      <Button text="Game Start" type="submit" dataCy="start" />
    </form>
  );
};

export default SettingForm;
