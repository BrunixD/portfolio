// app/layout.js
import { Inter } from 'next/font/google';
import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer'; // Import the footer

const inter = Inter({ subsets: ['latin'] });

export const metadata = { /* ... */ };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main> {/* Good practice to wrap content in a <main> tag */}
        <Footer />
      </body>
    </html>
  );
}