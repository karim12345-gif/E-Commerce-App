import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { NavigationBar } from '../components/ui/NavigationBar';
import Providers from './Providers';
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
