import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Header from '../components/layout/Header/Header';
import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';

const meta: Meta<typeof Header> = {
  title: 'layout/Header',
  component: Header,
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

type Story = StoryObj<typeof Header>;

export const Unauthenticated: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Header в состоянии без авторизации, отображает логотип и ссылку на логин.',
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
            firstName: 'John',
            lastName: 'Doe',
            gender: 'male',
            image: 'https://dummyjson.com/icon/johnd/128',
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
          'Header в состоянии авторизованного пользователя, отображает имя, аватар и кнопку logout.',
      },
    },
  },
};

export const AuthenticatedWithoutAvatar: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            id: 2,
            username: 'noavataruser',
            email: 'noavatar@example.com',
            firstName: 'Jane',
            lastName: 'Smith',
            gender: 'female',
            image: '',
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
          'Header для авторизованного пользователя без аватара, отображает только имя и кнопку logout.',
      },
    },
  },
};

export const AuthenticatedWithLongName: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            id: 3,
            username: 'longnameuser',
            email: 'longname@example.com',
            firstName: 'VeryLongFirstName',
            lastName: 'EvenLongerLastName',
            gender: 'male',
            image: 'https://dummyjson.com/icon/longname/128',
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
          'Header с авторизованным пользователем, имеющим длинное имя, для проверки отображения.',
      },
    },
  },
};

export const AuthenticatedWithBrokenAvatar: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            id: 4,
            username: 'brokenavataruser',
            email: 'broken@example.com',
            firstName: 'Broken',
            lastName: 'Avatar',
            gender: 'female',
            image: 'https://invalid-url.com/broken.jpg',
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
          'Header с авторизованным пользователем и невалидным URL аватара, для проверки обработки ошибок загрузки.',
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
        story:
          'Header в мобильном виде без авторизации, имя пользователя скрыто.',
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
            id: 5,
            username: 'mobileuser',
            email: 'mobile@example.com',
            firstName: 'Mobile',
            lastName: 'User',
            gender: 'male',
            image: 'https://dummyjson.com/icon/mobile/128',
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
        story:
          'Header в мобильном виде с авторизацией, имя пользователя скрыто.',
      },
    },
  },
};

export const TabletViewUnauthenticated: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Header в планшетном виде без авторизации.',
      },
    },
  },
};

export const TabletViewAuthenticated: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            id: 6,
            username: 'tabletuser',
            email: 'tablet@example.com',
            firstName: 'Tablet',
            lastName: 'User',
            gender: 'female',
            image: 'https://dummyjson.com/icon/tablet/128',
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
        story: 'Header в планшетном виде с авторизацией.',
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
          'Header в темной теме без авторизации (для визуальной проверки, если стили адаптированы).',
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
            id: 7,
            username: 'darkuser',
            email: 'dark@example.com',
            firstName: 'Dark',
            lastName: 'User',
            gender: 'male',
            image: 'https://dummyjson.com/icon/dark/128',
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
        story: 'Header в темной теме с авторизацией.',
      },
    },
  },
};
