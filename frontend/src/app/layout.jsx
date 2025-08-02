/**
 * Sets up global styles, fonts, and metadata for the app. 
 * Wraps all pages with a root layout to ensure consistent structure.
 */

import './globals.css'
import { Inter } from 'next/font/google';

const imFellEnglish = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-im-fell-english',
});

export const metadata = {
  title: 'PetRealm',
  description: 'Adopt mythical pets!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={imFellEnglish.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IM+Fell+English&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
