import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Amenities from '../components/Amenities';
import Gallery from '../components/Gallery';
import Rooms from '../components/Rooms';
import Reviews from '../components/Reviews';
import CTASection from '../components/CTASection';
import BookingSection from '../components/BookingSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Villa Jimena Resort | Private Luxury Sanctuary in Alfonso, Cavite</title>
        <meta name="description" content="Discover Villa Jimena, an exclusive private luxury sanctuary in Alfonso, Cavite. Experience timeless elegance, infinity pools, and immersive tropical landscapes." />
        <meta name="keywords" content="Villa Jimena, luxury resort Cavite, private villa rental Philippines, boutique resort Alfonso, Tagaytay staycation, high-end exclusive villa" />
        <meta property="og:title" content="Villa Jimena Resort | Private Luxury Sanctuary" />
        <meta property="og:description" content="A fully private tropical luxury retreat near Tagaytay. Experience unparalleled privacy and elegance in Alfonso, Cavite." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://villajimena.com" />
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
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
