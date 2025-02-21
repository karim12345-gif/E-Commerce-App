// hooks/useCheckoutLogic.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '~/src/context/CartContext';
import { User, CheckoutDto } from '~/src/types/app';
import { useToast } from '~/src/hooks/use-toast';
import { usePostCheckoutMutation } from '~/src/services/hooks/Checkout';

export const useCheckoutLogic = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { cart, clearCart } = useCart();
  const checkoutMutation = usePostCheckoutMutation();

  const [userInfo, setUserInfo] = useState<User>({
    id: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Check if the cart is empty
    if (cart.length === 0) {
      toast({
        title: 'Error',
        description: `No items in your cart`,
        variant: 'destructive', 
      });
      return; 
    }
  
    try {
      const checkoutData: CheckoutDto = {
        user: userInfo,
        products: cart.map(item => ({
          id: item.id,
          quantity: item.quantity,
        })),
      };
  
      checkoutMutation.mutate(checkoutData, {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: `Checkout has been submitted`,
            variant: 'default',
          });
          clearCart();
          router.push('/checkout/success');
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Failed to place order',
            variant: 'destructive',
          });
        }
      });
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNameChange = (name: string) => {
    setUserInfo(prev => ({ ...prev, name }));
  };

  return {
    cart,
    userInfo,
    isProcessing: checkoutMutation.isPending,
    handleSubmit,
    handleNameChange,
  };
};