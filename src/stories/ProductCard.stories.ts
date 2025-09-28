import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProductCard from '../components/products/ProductCard/ProductCard';
import { Product } from '@/types/products.types';

const meta: Meta<typeof ProductCard> = {
  title: 'Products/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    product: {
      control: 'object',
    },
    showAddToCart: {
      control: 'boolean',
    },
    onAddToCart: {
      action: 'added to cart',
    },
    priority: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

// Mock product base
const mockProduct: Product = {
  id: 1,
  title: 'Sample Product',
  description: 'This is a sample product description.',
  price: 99.99,
  discountPercentage: 0,
  rating: 4.5,
  stock: 100,
  brand: 'Sample Brand',
  category: 'Electronics',
  thumbnail: 'https://dummyjson.com/image/150',
  images: [],
};

export const Default: Story = {
  args: {
    product: mockProduct,
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Базовая карточка продукта без скидки, бренда и кнопки добавления в корзину.',
      },
    },
  },
};

export const WithDiscount: Story = {
  args: {
    product: {
      ...mockProduct,
      discountPercentage: 15,
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Карточка продукта со скидкой, отображает бейдж скидки и зачеркнутую оригинальную цену.',
      },
    },
  },
};

export const WithoutDiscount: Story = {
  args: {
    product: {
      ...mockProduct,
      discountPercentage: 0,
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка продукта без скидки.',
      },
    },
  },
};

export const WithBrand: Story = {
  args: {
    product: {
      ...mockProduct,
      brand: 'Famous Brand',
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка продукта с указанным брендом.',
      },
    },
  },
};

export const WithoutBrand: Story = {
  args: {
    product: {
      ...mockProduct,
      brand: '',
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка продукта без бренда.',
      },
    },
  },
};

export const WithRating: Story = {
  args: {
    product: {
      ...mockProduct,
      rating: 4.7,
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка продукта с рейтингом, отображает звезды и значение.',
      },
    },
  },
};

export const WithoutRating: Story = {
  args: {
    product: {
      ...mockProduct,
      rating: 0,
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка продукта без рейтинга (rating = 0).',
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    product: {
      ...mockProduct,
      title:
        'This is a very long product title that should be truncated after two lines in the card display',
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Карточка продукта с длинным названием для проверки усечения текста.',
      },
    },
  },
};

export const LongDescription: Story = {
  args: {
    product: {
      ...mockProduct,
      description:
        'This is a very long product description that exceeds 100 characters and should be truncated with ellipsis in the card display. Adding more text to ensure it is over the limit.',
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Карточка продукта с длинным описанием (>100 символов) для проверки усечения.',
      },
    },
  },
};

export const ShortDescription: Story = {
  args: {
    product: {
      ...mockProduct,
      description: 'Short desc.',
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка продукта с коротким описанием (<100 символов).',
      },
    },
  },
};

export const WithAddToCart: Story = {
  args: {
    product: mockProduct,
    showAddToCart: true,
    onAddToCart: () => console.log('Added to cart'),
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка продукта с кнопкой "Add to cart".',
      },
    },
  },
};

export const WithoutAddToCart: Story = {
  args: {
    product: mockProduct,
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка продукта без кнопки "Add to cart".',
      },
    },
  },
};

export const PriorityLoading: Story = {
  args: {
    product: mockProduct,
    showAddToCart: false,
    priority: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Карточка продукта с приоритетной загрузкой изображения (для LCP оптимизации).',
      },
    },
  },
};

export const BrokenImage: Story = {
  args: {
    product: {
      ...mockProduct,
      thumbnail: 'https://invalid-url.com/broken.jpg',
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Карточка продукта с невалидным URL изображения для проверки обработки ошибок (покажет placeholder).',
      },
    },
  },
};

export const LowPrice: Story = {
  args: {
    product: {
      ...mockProduct,
      price: 0.99,
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка продукта с низкой ценой для проверки форматирования.',
      },
    },
  },
};

export const HighPrice: Story = {
  args: {
    product: {
      ...mockProduct,
      price: 9999.99,
    },
    showAddToCart: false,
    priority: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка продукта с высокой ценой для проверки форматирования.',
      },
    },
  },
};

export const MobileView: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Карточка продукта в мобильном виде.',
      },
    },
  },
};

export const TabletView: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Карточка продукта в планшетном виде.',
      },
    },
  },
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Карточка продукта в темной теме.',
      },
    },
  },
};

export const ReducedMotion: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          'Карточка продукта с отключенными анимациями (prefers-reduced-motion).',
      },
    },
  },
};

export const FullFeatured: Story = {
  args: {
    product: {
      ...mockProduct,
      discountPercentage: 20,
      rating: 3.8,
      brand: 'Premium Brand',
      description:
        'Detailed description that is quite long to test truncation in the card component.',
    },
    showAddToCart: true,
    priority: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Карточка продукта со всеми функциями: скидка, бренд, рейтинг, длинное описание, кнопка добавления и приоритетная загрузка.',
      },
    },
  },
};
