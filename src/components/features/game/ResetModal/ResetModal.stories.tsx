import { ResetModalView } from './ResetModalView';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ResetModalView> = {
  title: 'features/game/ResetModal',
  component: ResetModalView,
  argTypes: {
    resultText: {
      control: {
        type: 'text',
      },
    },
    onResetGame: {
      action: 'onReset',
    },
  },
  args: {
    resultText: 'Draw!',
  },
};

export default meta;

type Story = StoryObj<typeof ResetModalView>;

export const Normal: Story = {
  render: args => <ResetModalView {...args} />,
};
