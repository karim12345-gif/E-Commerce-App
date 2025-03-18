import Image from 'next/image';
import { Card, CardContent } from '~/src/components/ui/card/card';
import { Product } from '~/src/types/app';

type ProductCategoryProps = {
  products: Product[];
};

export const ProductCategoryList = ({ products }: ProductCategoryProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {products?.length > 0 ? (
        products.map(product => (
          <Card key={product.id}>
            <CardContent className='p-4'>
              <div className='relative w-full h-48'>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={500}
                  height={300}
                  loading='lazy'
                  className='w-full h-full object-cover rounded-lg'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  placeholder='blur'
                  blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwZMiUlJSUlMTAxMDA0NjA1MTgxMgwoJjZHNTU1MTFCPTk7QUJDSUZMTlH/wAALCAAIACABAREA/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMEBQYCAf/aAAgBAQAAPwDdyfN6/R6PR6PR6PXrPR6PR6PR6PR6PR6PX//Z'
                  quality={75}
                />
              </div>
              <h2 className='text-xl font-semibold mb-2'>{product.name}</h2>
              <p className='text-gray-600 mb-2'>${product.price.amount}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className='col-span-full text-center text-gray-600 mt-8'>No products found in this category.</div>
      )}
    </div>
  );
};
