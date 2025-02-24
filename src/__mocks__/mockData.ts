import type { Product } from '~/src/types/app';

// mocking the data
export const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test description',
  price: {
    amount: 100.99,
    currency: 'USD',
  },
  images: ['test-image.jpg'],
  categories: ['category-1'],
  slug: 'test-product',
};