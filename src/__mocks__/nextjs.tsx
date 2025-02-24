import React from 'react';

// Types for the Image component props
export type ImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
  'data-testid'?: string;
};

// Types for the Link component props
export type LinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

// Mocking the implementation of Next.js Image component
export const mockImage = (props: ImageProps) => <img {...props} data-testid='product-image' />;

export const mockLink = ({ children, href, className }: LinkProps) => (
  <a href={href} className={className}>
    {children}
  </a>
);
