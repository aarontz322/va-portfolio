import { HeroSection } from "@/components/sections/hero";
import { TransformSection } from "@/components/sections/transform";
import { ServicesSection } from "@/components/sections/services";
import { PricingSectionWrapper } from "@/components/sections/pricing-wrapper";
import { WorksSection } from "@/components/sections/works";
import { CosmosGallery } from "@/components/sections/cosmos-gallery";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { AboutSection } from "@/components/sections/about";
import { FAQSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { Nav } from "@/components/sections/nav";

export default function Home() {
  return (
    <main className="relative z-10">
      <Nav />
      <HeroSection />
      <TransformSection />
      <ServicesSection />
      <PricingSectionWrapper />
      <WorksSection />
      <CosmosGallery />
      <TestimonialsSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
