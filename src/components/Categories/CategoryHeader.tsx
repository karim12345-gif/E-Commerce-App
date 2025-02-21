import { useRouter } from 'next/navigation';
import { ButtonIconLeft } from '../ui/ButtonIcon';

type CategoryHeaderProps = {
  name: string;
  description: string;
};

export const CategoryHeader = ({ name, description }: CategoryHeaderProps) => {
  const router = useRouter();

  const onBack = () => {
    router.push('/categories');
  };

  return (
    <div className='mb-8 mt-12'>
      <ButtonIconLeft variant='ghost' onClick={onBack} />
      <h1 className='text-3xl font-bold mb-2'>{name}</h1>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};
