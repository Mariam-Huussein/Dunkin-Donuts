import HeroSection from "./../Components/HeroSection";
import FeaturedMenu from "./../Components/FeaturedMenu";
import PromotionsBanner from "./../Components/PromotionsBanner";
import OfferList from "../Components/OfferList";

export default function HomePage() {
  return (
    <div className="full-height" style={{backgroundColor: "var(--card)"}}>
      <HeroSection />
      <PromotionsBanner />
      <OfferList />
      {/* <FeaturedMenu /> */}
    </div>
  );
}
