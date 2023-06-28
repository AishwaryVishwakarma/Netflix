import './globals.css';

export const metadata = {
  title: 'Netflix',
  description: 'Netflix clone app build using MextJs',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
