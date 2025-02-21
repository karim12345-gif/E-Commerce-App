import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IProductList } from '~/src/interfaces/products';
import { ButtonIconLeft } from '../ui/ButtonIcon';

interface ProductPageDetailPresenterProps {
  product: IProductList;
  selectedImageIndex: number;
  onImageSelect: (index: number) => void;
  onBack: () => void;
  onAddToCart: () => void;
}

export function ProductPageDetailPresenter({
  product,
  selectedImageIndex,
  onImageSelect,
  onBack,
  onAddToCart,
}: ProductPageDetailPresenterProps) {
  return (
    <div className='container mx-auto p-6'>
      <ButtonIconLeft variant='ghost' onClick={onBack} />

      <div className='grid md:grid-cols-2 gap-8'>
        <div className='space-y-4'>
          <div className='relative aspect-square overflow-hidden rounded-lg'>
            <Image
              src={product.images[selectedImageIndex]}
              alt={product.name}
              fill
              className='object-cover'
              priority
              unoptimized
            />
          </div>

          <div className='flex gap-4 overflow-x-auto pb-5 px-1'>
            <div className='flex gap-4 pr-4'>
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => onImageSelect(index)}
                  className={`relative w-20 aspect-square rounded-md overflow-hidden flex-shrink-0
                    ${selectedImageIndex === index ? 'ring-2 ring-primary' : ''}`}
                >
                  <Image src={image} alt={`Product view ${index + 1}`} fill className='object-cover' unoptimized />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl font-bold'>{product.name}</h1>
            <div className='flex gap-2 mt-2'>
              {product.categories.map(category => (
                <span key={category} className='px-3 py-1 bg-gray-100 rounded-full text-sm'>
                  {category}
                </span>
              ))}
            </div>
          </div>

          <p className='text-gray-600'>{product.description}</p>

          <div className='text-2xl font-bold'>
            {product.price.currency} {product.price.amount}
          </div>

          <Button size='lg' className='w-full md:w-auto' onClick={() => onAddToCart()}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
