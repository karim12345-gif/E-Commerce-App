import dynamic from 'next/dynamic';

const SuccessPage = dynamic(() => import('~/src/components/checkout').then(mod => mod.SuccessPage), {
  ssr: false,
});

export default function CheckoutSuccessPage() {
  return <SuccessPage />;
}
