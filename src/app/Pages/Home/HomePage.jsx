import HeroSection from "../../Components/Home/HeroSection/HeroSection";
import PromotionsBanner from "../../Components/Home/PromotionsBanner/PromotionsBanner";
import OfferList from "../../Components/Home/Offer/OfferList";

export default function HomePage() {
  return (
    <div className="full-height" style={{ backgroundColor: "var(--card)" }}>
      <HeroSection />
      <PromotionsBanner />
      <OfferList />
    </div>
  );
}
