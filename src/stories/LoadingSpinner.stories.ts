import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LoadingSpinner from '../components/common/LoadingSpinner/LoadingSpinner';
import styles from '../components/common/LoadingSpinner/LoadingSpinner.module.scss';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'white'],
    },
    text: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  args: {},
};

export const SmallSize: Story = {
  args: {
    size: 'small',
  },
};

export const MediumSize: Story = {
  args: {
    size: 'medium',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'large',
  },
};

export const PrimaryColor: Story = {
  args: {
    color: 'primary',
  },
};

export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
  },
};

export const WhiteColor: Story = {
  args: {
    color: 'white',
  },
};

export const WithText: Story = {
  args: {
    text: 'Загрузка данных...',
  },
};

export const CustomClass: Story = {
  args: {
    className: 'custom-class',
  },
};

export const InlineVariant: Story = {
  args: {
    className: styles.containerInline, // Assuming styles are imported from the module
    text: 'Загрузка...',
  },
};

export const FullscreenVariant: Story = {
  args: {
    className: styles.containerFullscreen,
    text: 'Полноэкранная загрузка',
    size: 'large',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const DarkVariant: Story = {
  args: {
    className: styles.containerDark,
    text: 'Загрузка в темном режиме',
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    text: 'Загрузка в темной теме',
  },
};

export const ReducedMotion: Story = {
  parameters: {
    chromatic: { disableSnapshot: true }, // Optional, for testing accessibility
  },
  args: {
    text: 'Загрузка с reduced motion',
  },
  // Note: To test prefers-reduced-motion, it depends on system settings or Storybook config
};

export const SmallWhiteWithText: Story = {
  args: {
    size: 'small',
    color: 'white',
    text: 'Маленький белый спиннер',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const LargeSecondaryInline: Story = {
  args: {
    size: 'large',
    color: 'secondary',
    className: styles.containerInline,
    text: 'Большой вторичный inline',
  },
};
