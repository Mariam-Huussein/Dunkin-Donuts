import HeroSection from "../Components/Home/HeroSection";
import PromotionsBanner from "../Components/Home/PromotionsBanner";
import OfferList from "../Components/Home/OfferList";

export default function HomePage() {
  return (
    <div className="full-height" style={{ backgroundColor: "var(--card)" }}>
      <HeroSection />
      <PromotionsBanner />
      <OfferList />
    </div>
  );
}
