'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ButtonIconLeft } from '@/components/ui/buttons/ButtonIcon';
import { BackButtonProps } from '~/src/types/app';

const BackButton = ({ 
  path, 
  variant = 'ghost',
  className = ''
}: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (path) {
      router.push(path);
    } else {
      router.back();
    }
  };

  return (
    <ButtonIconLeft
      aria-label="ButtonLeft"
      variant={variant}
      onClick={handleBack}
      className={className}
    />
  );
};

export default BackButton;