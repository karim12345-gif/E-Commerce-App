import { render, screen, fireEvent } from '@testing-library/react';
import { test, vi } from 'vitest';
import { NavigationBar } from '~/src/components/ui/nav/NavigationBar';

// Mock the Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the dynamic import of CartSheet
vi.mock('../../Cart', () => ({
  default: {
    CartSheet: () => <div data-testid='cart-sheet'>Cart Sheet</div>,
  },
}));

test('clicking the home button navigates to the home page', () => {
  render(<NavigationBar />);

  const homeButton = screen.getByRole('button', { name: '' });
  fireEvent.click(homeButton);
});

test('clicking the categories button navigates to the categories page', () => {
  render(<NavigationBar />);

  const categoriesButton = screen.getByRole('button', { name: /categories/i });
  fireEvent.click(categoriesButton);
});

test('clicking the order history button navigates to the orders page', () => {
  render(<NavigationBar />);

  const orderHistoryButton = screen.getByRole('button', { name: /order history/i });
  fireEvent.click(orderHistoryButton);
});
