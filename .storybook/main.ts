import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  core: {
    // @ts-expect-error
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async config => {
    const newConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config?.resolve?.alias,
          '~': path.resolve(__dirname, '../src/'),
          storybook: path.resolve(__dirname),
        },
      },
    };
    return newConfig;
  },
  features: {},
  docs: {
    autodocs: true,
  },
};

export default config;
