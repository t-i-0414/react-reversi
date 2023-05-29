import { Meta, StoryObj } from '@storybook/react';
import { Square } from './Square';

const meta: Meta<typeof Square> = {
  title: 'features/game/Board/Square',
  component: Square,
  argTypes: {
    dataCy: { control: { type: 'text' } },
  },
  args: {
    dataCy: 'dataCy',
  },
};

export default meta;

type Story = StoryObj<typeof Square>;

export const Normal: Story = {
  render: args => <Square {...args} />,
};
