'use client';

import { Card, CardContent } from '~/src/components/ui/card/card';
import { Button } from '~/src/components/ui/buttons/button';
import { DollarSign, Info } from 'lucide-react';
import { Order } from '~/src/types/app';
import { formatDate, getStatusColor } from '~/src/lib/utils';

interface OrderCardProps {
  order: Order;
  onDetailsClick: () => void;
}

// Order Card Component
export default function OrderCard({ order, onDetailsClick }: OrderCardProps) {
  return (
    <Card className='hover:shadow-lg transition-shadow'>
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
            <span className='font-bold'>{order.cart?.total?.amount?.toFixed(2)}</span>
            <Button variant='ghost' size='icon' onClick={onDetailsClick} className='ml-2'>
              <Info className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
