import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '~/src/context/CartContext';
import { CheckoutDto, User } from '~/src/types/app';
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

  // Memoize cart calculations to prevent unnecessary recalculations
  const cartSummary = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    return {
      subtotal,
      tax,
      total,
    };
  }, [cart]);

  // Memoize checkout data preparation
  const prepareCheckoutData = useCallback((): CheckoutDto => {
    return {
      user: userInfo,
      products: cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
      })),
      cart: {
        tax: cartSummary.tax,
        items: cart.map(item => ({
          id: item.id,
          referenceId: item.name, 
          type: 'PRODUCT',
          price: {
            amount: item.price,
            currency: 'AED'
          },
          quantity: item.quantity
        })),
        subtotal: {
          amount: cartSummary.subtotal,
          currency: 'AED'
        },
        total: {
          amount: cartSummary.total,
          currency: 'AED'
        }
      }
    };
  }, [userInfo, cart, cartSummary]);

  // Memoize submit handler to prevent unnecessary recreations
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
      const checkoutData = prepareCheckoutData();
  
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
  }, [cart, prepareCheckoutData, checkoutMutation, toast, clearCart, router]);

  // Memoize name change handler
  const handleNameChange = useCallback((name: string) => {
    setUserInfo(prev => ({ ...prev, name }));
  }, []);

  return {
    cart,
    userInfo,
    isProcessing: checkoutMutation.isPending,
    handleSubmit,
    handleNameChange,
  };
};