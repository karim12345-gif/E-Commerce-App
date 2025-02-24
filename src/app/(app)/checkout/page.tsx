'use client';

import dynamic from 'next/dynamic';
import { useCheckoutLogic } from './hooks/useCheckoutLogic';
import { BackButton } from '~/src/components/ui/buttons';

const OrderSummary = dynamic(() => import('~/src/components/checkout').then(mod => mod.OrderSummary), {
  ssr: false,
});
const UserForm = dynamic(() => import('~/src/components/checkout').then(mod => mod.UserForm), {
  ssr: false,
});

export default function CheckoutPage() {
  const { cart, userInfo, isProcessing, handleSubmit, handleNameChange } = useCheckoutLogic();

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-7xl w-full px-4 py-8'>
        <BackButton />
        <h1 className='text-3xl font-bold mb-8 text-center'>Checkout Page:</h1>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <OrderSummary cart={cart} />
          <UserForm userInfo={userInfo} isProcessing={isProcessing} onNameChange={handleNameChange} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
