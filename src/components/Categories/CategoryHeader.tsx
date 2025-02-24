import { BackButton } from '../ui/buttons';

type CategoryHeaderProps = {
  name: string;
  description: string;
};

export const CategoryHeader = ({ name, description }: CategoryHeaderProps) => {
  return (
    <div className='mb-8 mt-12'>
      <BackButton path='/categories' />
      <h1 className='text-3xl font-bold mb-2'>{name}</h1>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};
