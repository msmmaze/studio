import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';


export const metadata: Metadata = {
  title: 'ArkaNet',
  description: 'An openvpn client with advanced routing features.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add the 'dark' class here to enable dark mode by default
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <body className={`antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
