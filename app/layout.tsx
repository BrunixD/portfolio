// app/layout.js
import { Inter } from 'next/font/google';
import './styles/globals.css';
import Header from './components/Header'; // Import the header

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bruno Carvalho | FullStack Developer',
  description: 'The portfolio and mission log of a passionate developer navigating the universe of code.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* Add the Header here */}
        {children}
      </body>
    </html>
  );
}