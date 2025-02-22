import { Button } from '~/src/components/ui/buttons/button';
import { Card } from '~/src/components/ui/card/card';
import { Input } from '~/src/components/ui/inputs/input';
import { Label } from '~/src/components/ui/label/label';
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
