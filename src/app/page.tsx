import { HeroSection } from "@/components/sections/hero";
import { TransformSection } from "@/components/sections/transform";
import { ServicesSection } from "@/components/sections/services";
import { PricingSectionWrapper } from "@/components/sections/pricing-wrapper";
import { NovaCaseStudySection } from "@/components/sections/nova-case-study";
import { WorksSection } from "@/components/sections/works";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { AboutSection } from "@/components/sections/about";
import { FAQSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { Nav } from "@/components/sections/nav";
import { MobileBookBar } from "@/components/ui/mobile-book-bar";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="relative z-10">
        <HeroSection />
        <WorksSection />
        <TransformSection />
        <ServicesSection />
        <NovaCaseStudySection />
        <TestimonialsSection />
        <PricingSectionWrapper />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <MobileBookBar />
    </>
  );
}
