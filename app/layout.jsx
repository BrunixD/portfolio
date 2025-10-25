import { Inter } from 'next/font/google';
import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { LoadingProvider } from './context/LoadingContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bruno Carvalho | Fullstack Engineer & Interstellar Navigator',
  description: 'Explore the universe of Bruno Carvalho — a Fullstack Engineer crafting seamless, high-performance web experiences across galaxies of innovation.',
  openGraph: {
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}