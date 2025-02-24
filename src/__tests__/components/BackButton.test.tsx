import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BackButton } from '~/src/components/ui/buttons';
import { ButtonIconLeftProps } from '~/src/types/app';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock ButtonIconLeft component with proper typing
vi.mock('@/components/ui/buttons/ButtonIcon', () => ({
  ButtonIconLeft: ({ onClick, variant, className }: ButtonIconLeftProps) => (
    <button onClick={onClick} data-variant={variant} className={className} data-testid='button-icon-left'>
      Back
    </button>
  ),
}));

describe('BackButton', () => {
  // Setup router mock before each test
  const mockPush = vi.fn();
  const mockBack = vi.fn();

  beforeEach(() => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
      back: mockBack,
    });
  });

  // Clear all mocks after each test
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<BackButton />);
    const button = screen.getByTestId('button-icon-left');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-variant', 'ghost');
  });

  it('applies custom variant', () => {
    render(<BackButton variant='outline' />);
    const button = screen.getByTestId('button-icon-left');
    expect(button).toHaveAttribute('data-variant', 'outline');
  });

  it('applies custom className', () => {
    render(<BackButton className='custom-class' />);
    const button = screen.getByTestId('button-icon-left');
    expect(button).toHaveClass('custom-class');
  });

  it('navigates back when no path is provided', () => {
    render(<BackButton />);
    const button = screen.getByTestId('button-icon-left');

    fireEvent.click(button);

    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('navigates to specified path when path prop is provided', () => {
    const testPath = '/test-path';
    render(<BackButton path={testPath} />);
    const button = screen.getByTestId('button-icon-left');

    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith(testPath);
    expect(mockBack).not.toHaveBeenCalled();
  });

  it('handles navigation errors gracefully', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Navigation failed');
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push: vi.fn().mockRejectedValue(mockError),
      back: vi.fn().mockRejectedValue(mockError),
    });

    render(<BackButton path='/test' />);
    const button = screen.getByTestId('button-icon-left');

    fireEvent.click(button);

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
