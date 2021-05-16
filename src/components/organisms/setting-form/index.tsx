import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/atoms/button';
import useSettingForm from './hooks';

interface Inputs {
  sideSquaresCount: number;
}

const SettingForm: React.FC = () => {
  const { startGame } = useSettingForm();

  const {
    register,
    handleSubmit,
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
      <input
        type="range"
        {...register('sideSquaresCount', {
          required: true,
        })}
        min="4"
        max="16"
        step="2"
        data-cy="input-sideSquaresCount"
      />
      {errors.sideSquaresCount && <span>This field is required</span>}

      <Button text="Game Start" type="submit" dataCy="start" />
    </form>
  );
};

export default SettingForm;
