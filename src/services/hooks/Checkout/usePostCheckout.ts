import axios, { AxiosResponse } from 'axios'
import { ResponseModel } from 'src/models'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckoutApi } from '../../api'
import { CheckoutDto } from '~/src/types/app'

const postCheckout = async (data: CheckoutDto) => {
  const response: AxiosResponse<ResponseModel<null>> = await axios.post(
    CheckoutApi.postCheckoutOrder(),
    data,
  )
  return response.data.body
}

export const usePostCheckoutMutation = () => {
  const queryClient = useQueryClient()

  // let's create a mutation using the useMutation hook
  return useMutation({
    mutationFn: postCheckout,
    onSuccess: (_, checkoutData) => {
      queryClient.invalidateQueries({
        queryKey: ['GetListOfProducts']
      })

      // Store the order data in the cache
      const orderId = Date.now().toString()
      const orderData = {
        id: orderId,
        user: checkoutData.user,
        products: checkoutData.products,
        timestamp: new Date().toISOString(),
        status: 'COMPLETED'
      }

      // Store in React Query cache
      queryClient.setQueryData(['orders', orderId], orderData)

  
    }
  })
}