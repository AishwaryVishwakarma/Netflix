import './globals.css';
import {Rubik, Nunito, Ubuntu} from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export const metadata = {
  title: 'Netflix',
  description: 'Netflix clone app build using NextJs',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body
        className={`${rubik.variable} ${nunito.variable} ${ubuntu.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
