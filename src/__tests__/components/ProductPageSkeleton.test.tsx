import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ProductPageSkeleton } from '../../components/Product/ProductPageSkeleton';

test('renders the skeleton placeholders correctly', () => {
  render(<ProductPageSkeleton />);

  // Check if the skeleton title exists
  expect(screen.getByTestId('skeleton-title')).toBeInTheDocument();

  // Check if the skeleton items are rendered
  const skeletonItems = screen.getAllByTestId('skeleton-item');
  expect(skeletonItems).toHaveLength(6);

  // Check if each skeleton item has the expected structure
  skeletonItems.forEach(item => {
    // Check if the item has an image placeholder
    expect(item.querySelector('div.h-48.bg-gray-200.animate-pulse')).toBeInTheDocument();

    // Check if the item has a title placeholder
    expect(item.querySelector('div.h-4.bg-gray-300.rounded.w-3\\/4.mb-2.animate-pulse')).toBeInTheDocument();

    // Check if the item has a subtitle placeholder
    expect(item.querySelector('div.h-4.bg-gray-300.rounded.w-1\\/2.animate-pulse')).toBeInTheDocument();
  });
});
