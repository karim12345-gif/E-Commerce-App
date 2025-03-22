import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckoutApi } from '../../api';
import { CheckoutDto, HttpError } from '~/src/types/app';
import { ResponseModel } from 'src/models'; 

/**
 * Sends a checkout request using fetch() with manually error handling using http error
 * 
 * @param data - The checkout data (cart)
 * @returns null if successful
 */
const postCheckout = async (data: CheckoutDto): Promise<null> => {
  try {
    const response = await fetch(CheckoutApi.postCheckoutOrder(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Serialize the data to JSON
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    // If the response is not OK, throw an error
    if (!response.ok) {
      const error: HttpError = new Error(`HTTP Error: ${response.status}`);
      error.response = {
        status: response.status,
        data: {
          message: `Failed to post checkout: ${response.status}`,
        },
      };
      throw error;
    }

    const json: ResponseModel<null> = await response.json();


    if (!json || json.result !== 200 || json.body === null) {
      const error: HttpError = new Error(json?.message || 'Invalid response');
      error.response = {
        status: json?.result || 500,
        data: json,
      };
      throw error;
    }
    

    return json.body;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};

/**
 * React Query mutation hook for posting a checkout order.
 */
export const usePostCheckoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCheckout,
    onSuccess: (_, checkoutData) => {
      queryClient.invalidateQueries({ queryKey: ['GetListOfProducts'] });

      const orderId = Date.now().toString();
      const orderData = {
        id: orderId,
        user: checkoutData.user,
        status: 'COMPLETED',
        timestamp: new Date(),
        cart: {
          tax: checkoutData.cart?.tax,
          items: checkoutData.cart?.items || [],
          subtotal: checkoutData.cart?.subtotal || { amount: 0, currency: 'USD' },
          total: checkoutData.cart?.total || { amount: 0, currency: 'USD' },
        },
      };

      queryClient.setQueryData(['orders', orderId], orderData);
    },
  });
};
