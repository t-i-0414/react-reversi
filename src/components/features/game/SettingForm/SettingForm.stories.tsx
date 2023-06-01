import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '~/store';
import { SettingForm } from './SettingForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SettingForm> = {
  title: 'features/game/SettingForm',
  component: SettingForm,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SettingForm>;

export const Normal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const numberOfSquaresPerSideOfBoardInput = canvas.getByTestId(
      'input-numberOfSquaresPerSideOfBoard',
    );
    const blackPiecePlayerNameInput = canvas.getByTestId(
      'input-blackPiecePlayerName',
    );
    const whitePiecePlayerNameInput = canvas.getByTestId(
      'input-whitePiecePlayerName',
    );
    const firstTurnPieceBSelect = canvas.getByTestId('select-firstTurnPiece');
    const submitButton = canvas.getByTestId('start-game');

    await expect(numberOfSquaresPerSideOfBoardInput).toHaveValue('8');
    await expect(blackPiecePlayerNameInput).toHaveValue('Player1');
    await expect(whitePiecePlayerNameInput).toHaveValue('Player2');
    await expect(firstTurnPieceBSelect).toHaveValue('black');
    await expect(submitButton).toBeEnabled();
    await expect(submitButton).toHaveTextContent('Start Game');
    await expect(submitButton).toHaveProperty('type', 'submit');
  },
};

export const BlackPiecePlayerNameRequiredError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const blackPiecePlayerNameInput = canvas.getByTestId(
      'input-blackPiecePlayerName',
    );
    const submitButton = canvas.getByTestId('start-game');

    await userEvent.clear(blackPiecePlayerNameInput);
    await userEvent.click(submitButton);

    const blackPiecePlayerNameRequiredError = await canvas.findByTestId(
      'black-piece-player-name-required-error',
    );

    await expect(blackPiecePlayerNameRequiredError).toBeInTheDocument();
    await expect(blackPiecePlayerNameRequiredError).toHaveProperty(
      'role',
      'alert',
    );
  },
};

export const BlackPiecePlayerNameMinimum: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const blackPiecePlayerNameInput = canvas.getByTestId(
      'input-blackPiecePlayerName',
    );
    const submitButton = canvas.getByTestId('start-game');

    await userEvent.clear(blackPiecePlayerNameInput);
    await userEvent.type(blackPiecePlayerNameInput, 'a', {
      delay: 100,
    });
    await userEvent.click(submitButton);

    const blackPiecePlayerNameRequiredError = await canvas.queryByTestId(
      'black-piece-player-name-required-error',
    );
    const blackPiecePlayerNameMaxLengthError = await canvas.queryByTestId(
      'black-piece-player-name-max-length-error',
    );
    const blackPiecePlayerNameSameNameError = await canvas.queryByTestId(
      'black-piece-player-name-same-name-error',
    );

    await expect(blackPiecePlayerNameRequiredError).not.toBeInTheDocument();
    await expect(blackPiecePlayerNameMaxLengthError).not.toBeInTheDocument();
    await expect(blackPiecePlayerNameSameNameError).not.toBeInTheDocument();
  },
};

export const BlackPiecePlayerNameMax: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const blackPiecePlayerNameInput = canvas.getByTestId(
      'input-blackPiecePlayerName',
    );
    const submitButton = canvas.getByTestId('start-game');

    await userEvent.clear(blackPiecePlayerNameInput);
    await userEvent.type(blackPiecePlayerNameInput, 'a'.repeat(10), {
      delay: 100,
    });
    await userEvent.click(submitButton);

    const blackPiecePlayerNameRequiredError = await canvas.queryByTestId(
      'black-piece-player-name-required-error',
    );
    const blackPiecePlayerNameMaxLengthError = await canvas.queryByTestId(
      'black-piece-player-name-max-length-error',
    );
    const blackPiecePlayerNameSameNameError = await canvas.queryByTestId(
      'black-piece-player-name-same-name-error',
    );

    await expect(blackPiecePlayerNameRequiredError).not.toBeInTheDocument();
    await expect(blackPiecePlayerNameMaxLengthError).not.toBeInTheDocument();
    await expect(blackPiecePlayerNameSameNameError).not.toBeInTheDocument();
  },
};

export const BlackPiecePlayerNameMaxLengthError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const blackPiecePlayerNameInput = canvas.getByTestId(
      'input-blackPiecePlayerName',
    );

    const submitButton = canvas.getByTestId('start-game');

    await userEvent.clear(blackPiecePlayerNameInput);
    await userEvent.type(blackPiecePlayerNameInput, 'a'.repeat(11), {
      delay: 100,
    });
    await userEvent.click(submitButton);

    const blackPiecePlayerNameMaxLengthError = await canvas.findByTestId(
      'black-piece-player-name-max-length-error',
    );

    await expect(blackPiecePlayerNameMaxLengthError).toBeInTheDocument();
    await expect(blackPiecePlayerNameMaxLengthError).toHaveProperty(
      'role',
      'alert',
    );
  },
};

export const WhitePiecePlayerNameRequiredError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const whitePiecePlayerNameInput = canvas.getByTestId(
      'input-whitePiecePlayerName',
    );

    const submitButton = canvas.getByTestId('start-game');

    await userEvent.clear(whitePiecePlayerNameInput);
    await userEvent.click(submitButton);

    const whitePiecePlayerNameRequiredError = await canvas.findByTestId(
      'white-piece-player-name-required-error',
    );

    await expect(whitePiecePlayerNameRequiredError).toBeInTheDocument();
    await expect(whitePiecePlayerNameRequiredError).toHaveProperty(
      'role',
      'alert',
    );
  },
};

export const WhitePiecePlayerNameMinimum: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const whitePiecePlayerNameInput = canvas.getByTestId(
      'input-whitePiecePlayerName',
    );

    const submitButton = canvas.getByTestId('start-game');

    await userEvent.clear(whitePiecePlayerNameInput);
    await userEvent.type(whitePiecePlayerNameInput, 'a', {
      delay: 100,
    });
    await userEvent.click(submitButton);

    const whitePiecePlayerNameRequiredError = await canvas.queryByTestId(
      'white-piece-player-name-required-error',
    );
    const whitePiecePlayerNameMaxLengthError = await canvas.queryByTestId(
      'white-piece-player-name-max-length-error',
    );
    const whitePiecePlayerNameSameNameError = await canvas.queryByTestId(
      'white-piece-player-name-same-name-error',
    );

    await expect(whitePiecePlayerNameRequiredError).not.toBeInTheDocument();
    await expect(whitePiecePlayerNameMaxLengthError).not.toBeInTheDocument();
    await expect(whitePiecePlayerNameSameNameError).not.toBeInTheDocument();
  },
};

export const WhitePiecePlayerNameMax: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const whitePiecePlayerNameInput = canvas.getByTestId(
      'input-whitePiecePlayerName',
    );

    const submitButton = canvas.getByTestId('start-game');

    await userEvent.clear(whitePiecePlayerNameInput);
    await userEvent.type(whitePiecePlayerNameInput, 'a'.repeat(10), {
      delay: 100,
    });
    await userEvent.click(submitButton);

    const whitePiecePlayerNameRequiredError = await canvas.queryByTestId(
      'white-piece-player-name-required-error',
    );
    const whitePiecePlayerNameMaxLengthError = await canvas.queryByTestId(
      'white-piece-player-name-max-length-error',
    );
    const whitePiecePlayerNameSameNameError = await canvas.queryByTestId(
      'white-piece-player-name-same-name-error',
    );

    await expect(whitePiecePlayerNameRequiredError).not.toBeInTheDocument();
    await expect(whitePiecePlayerNameMaxLengthError).not.toBeInTheDocument();
    await expect(whitePiecePlayerNameSameNameError).not.toBeInTheDocument();
  },
};

export const WhitePiecePlayerNameMaxLengthError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const whitePiecePlayerNameInput = canvas.getByTestId(
      'input-whitePiecePlayerName',
    );

    const submitButton = canvas.getByTestId('start-game');

    await userEvent.clear(whitePiecePlayerNameInput);
    await userEvent.type(whitePiecePlayerNameInput, 'a'.repeat(11), {
      delay: 100,
    });
    await userEvent.click(submitButton);

    const whitePiecePlayerNameMaxLengthError = await canvas.findByTestId(
      'white-piece-player-name-max-length-error',
    );

    await expect(whitePiecePlayerNameMaxLengthError).toBeInTheDocument();
    await expect(whitePiecePlayerNameMaxLengthError).toHaveProperty(
      'role',
      'alert',
    );
  },
};

export const SameNameError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const whitePiecePlayerNameInput = canvas.getByTestId(
      'input-whitePiecePlayerName',
    );

    const blackPiecePlayerNameInput = canvas.getByTestId(
      'input-blackPiecePlayerName',
    );

    const submitButton = canvas.getByTestId('start-game');

    await userEvent.clear(blackPiecePlayerNameInput);
    await userEvent.clear(whitePiecePlayerNameInput);
    await userEvent.type(blackPiecePlayerNameInput, 'a'.repeat(10), {
      delay: 100,
    });
    await userEvent.type(whitePiecePlayerNameInput, 'a'.repeat(10), {
      delay: 100,
    });
    await userEvent.click(submitButton);

    const blackPiecePlayerNameSameNameError = await canvas.findByTestId(
      'black-piece-player-name-same-name-error',
    );
    const whitePiecePlayerNameSameNameError = await canvas.findByTestId(
      'white-piece-player-name-same-name-error',
    );

    await expect(blackPiecePlayerNameSameNameError).toBeInTheDocument();
    await expect(blackPiecePlayerNameSameNameError).toHaveProperty(
      'role',
      'alert',
    );
    await expect(whitePiecePlayerNameSameNameError).toBeInTheDocument();
    await expect(whitePiecePlayerNameSameNameError).toHaveProperty(
      'role',
      'alert',
    );
  },
};
