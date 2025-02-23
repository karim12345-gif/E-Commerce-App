import Image from 'next/image';

interface ErrorImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function ErrorImage({ src, alt, width = 200, height = 100 }: ErrorImageProps) {
  return (
    <div className='mb-6'>
      <Image src={src} alt={alt} width={width} height={height} className='mx-auto mb-8' />
    </div>
  );
}
