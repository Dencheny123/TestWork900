import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Footer from '../components/layout/Footer/Footer';
import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';

const meta: Meta<typeof Footer> = {
  title: 'layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Reset store state before each story
      useEffect(() => {
        useAuthStore.setState({
          user: null,
          isAuthenticated: false,
        });
      }, []);
      return Story();
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Unauthenticated: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({
          isAuthenticated: false,
          user: null,
        });
      }, []);
      return Story();
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Footer в состоянии без авторизации, отображает только год и описание.',
      },
    },
  },
};

export const Authenticated: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            gender: 'male',
            image: 'https://example.com/image.jpg',
          },
        });
      }, []);
      return Story();
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Footer в состоянии авторизованного пользователя, отображает статус логина с email.',
      },
    },
  },
};

export const AuthenticatedLongEmail: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            id: 1,
            username: 'longemailuser',
            email: 'very.long.email.address@example.com',
            firstName: 'Long',
            lastName: 'Email',
            gender: 'female',
            image: 'https://example.com/image.jpg',
          },
        });
      }, []);
      return Story();
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Footer с авторизованным пользователем, имеющим длинный email, для проверки обтекания текста.',
      },
    },
  },
};

export const MobileViewUnauthenticated: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Footer в мобильном виде без авторизации.',
      },
    },
  },
};

export const MobileViewAuthenticated: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            id: 1,
            username: 'mobileuser',
            email: 'mobile@example.com',
            firstName: 'Mobile',
            lastName: 'User',
            gender: 'male',
            image: 'https://example.com/image.jpg',
          },
        });
      }, []);
      return Story();
    },
  ],
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Footer в мобильном виде с авторизацией.',
      },
    },
  },
};

export const TabletView: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            id: 1,
            username: 'tabletuser',
            email: 'tablet@example.com',
            firstName: 'Tablet',
            lastName: 'User',
            gender: 'female',
            image: 'https://example.com/image.jpg',
          },
        });
      }, []);
      return Story();
    },
  ],
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Footer в планшетном виде с авторизацией.',
      },
    },
  },
};

export const DarkModeUnauthenticated: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Footer в темной теме без авторизации (если стили поддерживают, иначе для визуальной проверки).',
      },
    },
  },
};

export const DarkModeAuthenticated: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            id: 1,
            username: 'darkuser',
            email: 'dark@example.com',
            firstName: 'Dark',
            lastName: 'User',
            gender: 'male',
            image: 'https://example.com/image.jpg',
          },
        });
      }, []);
      return Story();
    },
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Footer в темной теме с авторизацией.',
      },
    },
  },
};
