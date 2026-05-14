import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Amenities from '../components/Amenities';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import CTASection from '../components/CTASection';
import BookingSection from '../components/BookingSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>The Grove by Six Marys | Boutique Hotel Resort in Bacolor, Pampanga</title>
        <meta name="description" content="Experience modern comfort at The Grove by Six Marys in Bacolor, Pampanga. Your perfect pause from your busy life with poolside leisure, dining, garden spaces, and hotel-style rooms." />
        <meta name="keywords" content="The Grove by Six Marys, boutique hotel resort Bacolor Pampanga, staycation Pampanga, pool resort Philippines, weekend escape Central Luzon" />
        <meta property="og:title" content="The Grove by Six Marys | Experience Modern Comfort" />
        <meta property="og:description" content="Your perfect pause from your busy life. Discover a warm and modern boutique resort experience in Bacolor, Pampanga." />
        <meta property="og:image" content="/images/the-grove-hero.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://thegrovebysixmarys.com" />
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Amenities />
        <Gallery />
        <Reviews />
        <CTASection />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
