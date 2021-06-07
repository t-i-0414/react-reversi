/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Provider } from 'react-redux';
import { Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Const from 'src/const';
import ResetModal from '.';

const { Player, PieceColor } = Const;

const store = {
  getState: (): Store => {
    return {
      // @ts-ignore
      game: {
        players: {
          black: {
            player: { ...Player.PLAYER_1 },
            pieceColor: PieceColor.BLACK,
            score: 1,
            current: true,
          },
          white: {
            player: { ...Player.PLAYER_2 },
            pieceColor: PieceColor.WHITE,
            score: 0,
            current: false,
          },
        },
      },
    };
  },
  subscribe: () => 0,
  dispatch: action('dispatch'),
};

export default {
  title: 'Molecules/ResetModal',
  component: ResetModal,
  // @ts-ignore
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template: Story = () => <ResetModal />;

export const normal = Template.bind({});
