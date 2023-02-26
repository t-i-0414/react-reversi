/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react/types-6-0';
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

export default {
  title: 'Molecules/ResetModal',
  component: ResetModal,
  // @ts-ignore
  decorators: [story => <Provider store={store}>{story()}</Provider>],
};

const Template: Story = () => <ResetModal />;

export const Normal = Template.bind({});
