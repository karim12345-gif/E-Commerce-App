'use client';

import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Order } from '~/src/types/app';
import { Card, CardContent, CardHeader, CardTitle } from '~/src/components/ui/card/card';
import { Button } from '~/src/components/ui/buttons/button';
import { ShoppingBag, Package, DollarSign, Info } from 'lucide-react';

// Helper function to safely convert timestamp to localeString
const formatDate = (timestamp?: Date | string | null): string => {
  if (!timestamp) return 'N/A';

  // If it's already a Date object
  if (timestamp instanceof Date) {
    return timestamp.toLocaleDateString();
  }

  // If it's a string, try to create a Date
  try {
    return new Date(timestamp).toLocaleDateString();
  } catch {
    return 'N/A';
  }
};

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cachedOrders, setCachedOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Retrieve orders from React Query cache
    const retrieveOrders = () => {
      const orders: Order[] = [];

      // Iterate through all queries
      queryClient
        .getQueryCache()
        .getAll()
        .forEach(query => {
          // Check if the query key starts with 'orders'
          if (query.queryKey[0] === 'orders' && query.state.data) {
            orders.push(query.state.data as Order);
          }
        });

      // Sort orders by timestamp (most recent first)
      const sortedOrders = orders.sort((a, b) => {
        const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        return dateB - dateA;
      });

      setCachedOrders(sortedOrders);
    };

    retrieveOrders();
  }, [queryClient]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600';
      case 'PENDING':
        return 'text-yellow-600';
      case 'CANCELLED':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const renderOrderDetails = (order: Order) => (
    <Card className='w-full max-w-2xl mx-auto mt-4'>
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex justify-between'>
            <span>Order ID:</span>
            <span className='font-semibold'>{order.id}</span>
          </div>
          <div className='flex justify-between'>
            <span>Date:</span>
            <span>{formatDate(order.timestamp)}</span>
          </div>
          <div className='flex justify-between'>
            <span>Status:</span>
            <span className={getStatusColor(order.status)}>{order.status}</span>
          </div>
          <div className='border-t pt-4'>
            <h3 className='text-lg font-semibold mb-2'>Items</h3>
            {order.cart?.items.map(item => (
              <div key={item.id} className='flex justify-between py-2 border-b'>
                <span>{item.referenceId}</span>
                <span>
                  {item.quantity} x {item.price.currency} {item.price.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className='flex justify-between font-bold text-lg'>
            <span>Total:</span>
            <span>
              {order.cart?.total.currency} {order.cart?.total.amount.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className='container mx-auto px-4 py-8 mt-12'>
      <h1 className='text-3xl font-bold mb-6 flex items-center'>
        <ShoppingBag className='mr-3' /> Order History
      </h1>

      {cachedOrders.length === 0 ? (
        <div className='text-center py-12 bg-gray-100 rounded-lg'>
          <Package className='mx-auto mb-4 h-12 w-12 text-gray-500' />
          <p className='text-xl text-gray-600'>No orders found</p>
        </div>
      ) : (
        <div className='grid gap-4'>
          {cachedOrders.map(order => (
            <Card key={order.id} className='hover:shadow-lg transition-shadow'>
              <CardContent className='p-4'>
                <div className='flex justify-between items-center'>
                  <div>
                    <div className='flex items-center'>
                      <span className='font-semibold mr-2'>Order #{order.id}</span>
                      <span className={`text-sm ${getStatusColor(order.status)}`}>{order.status}</span>
                    </div>
                    <p className='text-gray-600'>{formatDate(order.timestamp)}</p>
                  </div>
                  <div className='flex items-center'>
                    <DollarSign className='mr-2 h-5 w-5 text-green-600' />
                    <span className='font-bold'>
                      {order.cart?.total.currency} {order.cart?.total.amount.toFixed(2)}
                    </span>
                    <Button variant='ghost' size='icon' onClick={() => setSelectedOrder(order)} className='ml-2'>
                      <Info className='h-5 w-5' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='relative w-full max-w-2xl'>
            {renderOrderDetails(selectedOrder)}
            <Button variant='destructive' className='mt-4 w-full' onClick={() => setSelectedOrder(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
