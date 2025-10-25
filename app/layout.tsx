// app/layout.js
import { Inter } from 'next/font/google';
import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { LoadingProvider } from './context/LoadingContext'; // Import the provider

const inter = Inter({ subsets: ['latin'] });

export const metadata = { /* ... */ };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap everything inside the body with the LoadingProvider */}
        <LoadingProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}