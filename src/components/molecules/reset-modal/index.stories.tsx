/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { PlayerMap, PieceColor } from '~/const';
import ResetModal from '.';
import type { Store } from '~/types';

const store = {
  getState: (): Store => ({
    // @ts-ignore
    game: {
      players: {
        black: {
          ...PlayerMap.PLAYER_1,
          pieceColor: PieceColor.BLACK,
          score: 1,
          current: true,
        },
        white: {
          ...PlayerMap.PLAYER_2,
          pieceColor: PieceColor.WHITE,
          score: 0,
          current: false,
        },
      },
    },
  }),
  subscribe: () => 0,
  dispatch: action('dispatch'),
};

const meta: Meta<typeof ResetModal> = {
  title: 'Molecules/ResetModal',
  component: ResetModal,
};

export default meta;

type Story = StoryObj<typeof ResetModal>;

export const Normal: Story = {
  decorators: [
    // @ts-ignore
    StoryComponent => <Provider store={store}>{StoryComponent()}</Provider>,
  ],
};
