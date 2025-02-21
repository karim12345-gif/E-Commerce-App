import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '~/src/types/app';

interface UserFormProps {
  userInfo: User;
  isProcessing: boolean;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UserForm = ({ userInfo, isProcessing, onNameChange, onSubmit }: UserFormProps) => {
  return (
    <Card className='p-6 lg:order-1'>
      <h2 className='text-xl font-semibold mb-6'>Your Information</h2>
      <form onSubmit={onSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Full Name</Label>
          <Input id='name' name='name' value={userInfo.name} onChange={e => onNameChange(e.target.value)} required />
        </div>

        <Button type='submit' className='w-full mt-6' disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </form>
    </Card>
  );
};
