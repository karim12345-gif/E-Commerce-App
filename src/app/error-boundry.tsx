'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { Button } from '~/src/components/ui/buttons/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex items-center justify-center h-screen bg-gray-50'>
          <div className='p-8 flex flex-col items-center text-center'>
            <div className='flex flex-col items-center mb-6'>
              <h1 className='text-6xl font-extrabold text-red-500 mb-2'>Error</h1>
              <h5 className='text-2xl font-medium text-gray-700 mb-2'>Oops, something went wrong! 👨🏻‍💻</h5>
            </div>

            <Button onClick={this.handleReset} variant='default' className='px-6 py-3'>
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
