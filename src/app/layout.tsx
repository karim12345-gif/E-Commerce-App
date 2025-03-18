import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from './Providers';
import { NavigationBar } from '../components/ui/nav/NavigationBar';
import { Toaster } from '../components/ui/toaster';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'E-commerce App',
  description: 'E-commerce app generated',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />

        {/* Load fonts with display=swap to prevent blocking */}
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap' rel='stylesheet' />
        <link rel='preload' as='image' href='https://placehold.co/1000x1000?text=Product' />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <NavigationBar />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
