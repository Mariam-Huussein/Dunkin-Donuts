import "./AboutPage.css";
import ValuesSection from "../../Components/About/ValuesSection";
import AboutHero from "../../Components/About/AboutHero";

export default function AboutPage() {
  return (
    <section className="mb-0 hero-about-container">
      <AboutHero />
      <ValuesSection />
    </section>
  );
}
