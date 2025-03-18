import Image from 'next/image';
import { Button } from '~/src/components/ui/buttons/button';
import { ProductPageDetailPresenterProps } from '~/src/interfaces';
import { BackButton } from '../ui/buttons';

export function ProductPageDetailPresenter({
  product,
  selectedImageIndex,
  onImageSelect,
  onAddToCart,
}: ProductPageDetailPresenterProps) {
  return (
    <div className='min-h-screen flex items-center justify-center mt-10'>
      <div className='container mx-auto p-6'>
        <BackButton />

        <div className='grid md:grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <div className='relative aspect-square overflow-hidden rounded-lg'>
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                width={450}
                height={450}
                className='object-cover'
                quality={75}
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
                    <Image src={image} alt={`Product view ${index + 1}`} width={450} height={450} className='object-cover' />
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

            <Button aria-label='Add to cart' size='lg' className='w-full md:w-auto' onClick={() => onAddToCart()}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
