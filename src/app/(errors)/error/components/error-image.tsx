import Image from 'next/image';
import { ErrorImageProps } from '~/src/interfaces';

export function ErrorImage({ src, alt, width = 200, height = 100 }: ErrorImageProps) {
  return (
    <div className='mb-6'>
      <Image loading='lazy' src={src} alt={alt} width={width} height={height} className='mx-auto mb-8' />
    </div>
  );
}
