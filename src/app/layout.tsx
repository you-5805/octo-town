import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import '@/styles/global.css';

export const metadata = {
  title: 'octo-town',
} satisfies Metadata;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  );
}
