import { Provider } from 'react-redux';
import { store } from '~/store';
import { SettingForm } from './SettingForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SettingForm> = {
  title: 'features/game/SettingForm',
  component: SettingForm,
  argTypes: {
    dataCy: {
      control: { type: 'text' },
    },
  },
  args: {
    dataCy: 'SettingForm',
  },
};

export default meta;

type Story = StoryObj<typeof SettingForm>;

export const Normal: Story = {
  render: args => <SettingForm {...args} />,
  decorators: [
    StoryComponent => (
      <Provider store={store}>
        <StoryComponent />
      </Provider>
    ),
  ],
};
