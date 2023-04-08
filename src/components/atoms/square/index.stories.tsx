import { Meta, StoryObj } from '@storybook/react';
import Square from '.';

const meta: Meta<typeof Square> = {
  title: 'Atoms/Square',
  component: Square,
};

export default meta;

type Story = StoryObj<typeof Square>;

export const Normal: Story = {
  args: {
    dataCy: 'dataCy',
  },
};
