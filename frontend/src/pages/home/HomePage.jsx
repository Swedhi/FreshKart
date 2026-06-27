import Navbar from "../../layouts/Navbar";
import HeroSection from "../../sections/HeroSection";
import OfferBanner from "../../sections/OfferBanner";
import CategoriesSection from "../../components/home/CategoriesSection";
import StatsBar from "../../components/home/StatsBar";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import Footer from "../../components/common/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <CategoriesSection />

      <OfferBanner />

      <StatsBar />

      <FeaturedProducts />

      <Footer />
    </>
  );
}