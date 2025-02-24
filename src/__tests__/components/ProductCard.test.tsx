vi.mock('next/image', () => ({
  default: ({ src, alt, className, ...props }: ImageProps) => (
    <img src={src} alt={alt} className={className} {...props} data-testid='product-image' />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, className }: LinkProps) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock('~/src/context/CartContext', () => ({
  useCart: () => mockCartContext,
}));

vi.mock('~/src/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ProductCard } from '~/src/components/Product';
import { mockProduct } from '../../__mocks__/mockData';
import { ImageProps, LinkProps } from '~/src/__mocks__/nextjs';
import { mockCartContext } from '~/src/__mocks__/content';

describe('ProductCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('displays product information correctly', () => {
      render(<ProductCard product={mockProduct} />);

      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText(`${mockProduct.price.currency} ${mockProduct.price.amount}`)).toBeInTheDocument();
    });

    it('renders product image with correct attributes', () => {
      render(<ProductCard product={mockProduct} />);

      const image = screen.getByTestId('product-image');
      expect(image).toHaveAttribute('src', 'test-image.jpg');
      expect(image).toHaveAttribute('alt', 'Test Product');
    });

    it('renders View button with correct product link', () => {
      render(<ProductCard product={mockProduct} />);

      const viewLink = screen.getByText('View').closest('a');
      expect(viewLink).toHaveAttribute('href', '/products/1');
    });
  });

  describe('interactions', () => {
    it('successfully adds product to cart', async () => {
      const { toast } = await import('~/src/hooks/use-toast');
      render(<ProductCard product={mockProduct} />);

      await fireEvent.click(screen.getByText('Add to Cart'));

      expect(mockCartContext.addToCart).toHaveBeenCalledWith({
        id: '1',
        name: 'Test Product',
        price: mockProduct.price.amount,
        image: 'test-image.jpg',
      });

      expect(toast).toHaveBeenCalledWith({
        title: 'Success',
        description: 'Test Product has been added to your cart',
        variant: 'default',
        duration: 1000,
      });
    });

    it('handles add to cart errors appropriately', async () => {
      const { toast } = await import('~/src/hooks/use-toast');
      const error = new Error('Failed to add to cart');
      vi.mocked(mockCartContext.addToCart).mockRejectedValueOnce(error);
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<ProductCard product={mockProduct} />);
      await fireEvent.click(screen.getByText('Add to Cart'));

      expect(toast).toHaveBeenCalledWith({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive',
        duration: 1000,
      });

      expect(consoleSpy).toHaveBeenCalledWith('Add to cart error:', error);
      consoleSpy.mockRestore();
    });
  });
});
