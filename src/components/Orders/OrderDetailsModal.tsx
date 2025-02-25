'use client';

import { Card, CardContent, CardHeader, CardTitle } from '~/src/components/ui/card/card';
import { Button } from '~/src/components/ui/buttons/button';
import { Order } from '~/src/types/app';
import { formatDate, getStatusColor } from '~/src/lib/utils';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

// Order Model Component
export default function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='relative w-full max-w-2xl'>
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
                <span>Product Name:</span>
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
                <span>{order?.total?.toFixed(4)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button variant='destructive' className='mt-4 w-full' onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
