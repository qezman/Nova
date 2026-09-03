import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FeatureBlock } from "@/components/home/FeatureBlock";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ScrollReveal />

        <FeatureBlock
          eyebrow="Power Architecture"
          headline="18 hours. Zero compromises."
          body="A custom stacked silicon-anode cell delivers all-day continuous capture in a chassis under 8 millimeters thin. Charges to 80% in twenty-two minutes."
          imageSrc="/images/feature-battery.webp"
          imageAlt="Nova internal stacked battery architecture"
          layout="image-left"
        />

        <FeatureBlock
          eyebrow="Tactile Interface"
          headline="Physical certainty in every touch."
          body="Linear resonant actuators produce calibrated micro-pulses directly beneath your fingertip. Navigation becomes muscle memory without looking down."
          imageSrc="/images/feature-haptics.webp"
          imageAlt="Nova precision haptic actuator assembly"
          layout="image-right"
        />

        <FeatureBlock
          eyebrow="Materials & Finish"
          headline="Grade 5 titanium. Ceramic back."
          body="Milled from a solid billet of aerospace-grade titanium, bead-blasted to a warm satin touch, and bonded to a non-conductive ceramic substrate."
          imageSrc="/images/feature-materials.webp"
          imageAlt="Nova milled titanium rim and ceramic housing"
          layout="image-left"
        />
      </main>
      <Footer />
    </>
  );
}
