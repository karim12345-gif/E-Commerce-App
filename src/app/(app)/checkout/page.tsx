'use client';

import { useRouter } from 'next/navigation';
import { useCheckoutLogic } from './hooks/useCheckoutLogic';
import { ButtonIconLeft } from '~/src/components/ui/buttons/ButtonIcon';
import { OrderSummary, UserForm } from '~/src/components/checkout';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, userInfo, isProcessing, handleSubmit, handleNameChange } = useCheckoutLogic();

  const onBack = () => router.back();

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-7xl w-full px-4 py-8'>
        <ButtonIconLeft variant='ghost' onClick={onBack} />
        <h1 className='text-3xl font-bold mb-8 text-center'>Checkout Page:</h1>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <OrderSummary cart={cart} />
          <UserForm userInfo={userInfo} isProcessing={isProcessing} onNameChange={handleNameChange} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
