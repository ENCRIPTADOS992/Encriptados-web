import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export default function AppsLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <main className={inter.className}>{children}</main>;
}
