import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ErrorMessage, {
  ErrorType,
} from '../components/common/ErrorMessage/ErrorMessage';
import styles from '../components/common/ErrorMessage/ErrorMessage.module.scss';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'] as ErrorType[],
    },
    message: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    onRetry: {
      action: 'retried',
    },
    retryText: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    showIcon: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    message: 'Произошла ошибка',
  },
};

export const WithTitle: Story = {
  args: {
    message: 'Не удалось загрузить данные',
    title: 'Ошибка загрузки',
  },
};

export const WithRetry: Story = {
  args: {
    message: 'Не удалось подключиться к серверу',
    onRetry: () => console.log('Retry clicked'),
    retryText: 'Повторить попытку',
  },
};

export const WithoutIcon: Story = {
  args: {
    message: 'Произошла ошибка',
    showIcon: false,
  },
};

export const WarningType: Story = {
  args: {
    message: 'Предупреждение: низкий заряд батареи',
    type: 'warning',
    title: 'Предупреждение',
  },
};

export const InfoType: Story = {
  args: {
    message: 'Информация: обновление доступно',
    type: 'info',
    title: 'Информация',
  },
};

export const SuccessType: Story = {
  args: {
    message: 'Операция успешно завершена',
    type: 'success',
    title: 'Успех',
  },
};

export const CustomClass: Story = {
  args: {
    message: 'Произошла ошибка',
    className: 'custom-class',
  },
};

export const CompactVariant: Story = {
  args: {
    message: 'Компактная ошибка',
    className: styles.containerCompact, // Предполагая, что styles импортированы из модуля
  },
};

export const NoIconVariant: Story = {
  args: {
    message: 'Ошибка без иконки',
    className: styles.containerNoIcon, // Предполагая, что styles импортированы
    showIcon: false,
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    message: 'Ошибка в темной теме',
  },
};
