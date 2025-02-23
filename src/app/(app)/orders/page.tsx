'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Order } from '~/src/types/app';
import { ShoppingBag } from 'lucide-react';
import dynamic from 'next/dynamic';
import { OrderNotFound } from '~/src/components/Orders';

// Lazy load components
const OrderCard = dynamic(() => import('~/src/components/Orders').then(mod => mod.OrderCard), {
  ssr: false,
});

const OrderDetailsModal = dynamic(() => import('~/src/components/Orders').then(mod => mod.OrderDetailsModal), {
  ssr: false,
});

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cachedOrders, setCachedOrders] = useState<Order[]>([]);

  const retrieveOrders = useMemo(() => {
    return () => {
      const orders: Order[] = queryClient
        .getQueryCache()
        .getAll()
        .filter(query => query.queryKey[0] === 'orders' && query.state.data)
        .map(query => query.state.data as Order)
        .sort((a, b) => {
          const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
          const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
          return dateB - dateA;
        });

      setCachedOrders(orders);
    };
  }, [queryClient]);

  useEffect(() => {
    retrieveOrders();
  }, [retrieveOrders]);

  return (
    <div className='container mx-auto px-4 py-8 mt-12'>
      <h1 className='text-3xl font-bold mb-6 flex items-center'>
        <ShoppingBag className='mr-3' /> Order History
      </h1>

      {cachedOrders.length === 0 ? (
        <OrderNotFound />
      ) : (
        <div className='grid gap-4'>
          {cachedOrders.map(order => (
            <Suspense key={order.id} fallback={<div>Loading...</div>}>
              <OrderCard order={order} onDetailsClick={() => setSelectedOrder(order)} />
            </Suspense>
          ))}
        </div>
      )}

      {selectedOrder && (
        <Suspense fallback={<div>Loading...</div>}>
          <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        </Suspense>
      )}
    </div>
  );
}
