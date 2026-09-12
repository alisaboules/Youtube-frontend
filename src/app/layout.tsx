import type { Metadata } from 'next';
import { Roboto, Noto_Sans } from 'next/font/google';
import './globals.scss';
import { Providers } from '@/providers/Providers';
import { SITE_URL } from '@/constants/api.constants';

const geistRoboto = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistNotoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: {
    absolute: 'Youtube',
    template: '%s | Youtube'
  },
  description: 'My version for Youtube',
  metadataBase: new URL(SITE_URL)
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistRoboto.variable} ${geistNotoSans.variable} h-full antialiased text-base`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
