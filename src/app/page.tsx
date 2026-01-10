import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import QualityShowcase from "@/components/sections/QualityShowcase";
import BenefitsGrid from "@/components/sections/BenefitsGrid";
import ScienceSection from "@/components/sections/ScienceSection";
import RitualSection from "@/components/sections/RitualSection";
import IngredientsSection from "@/components/sections/IngredientsSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SustainabilitySection from "@/components/sections/SustainabilitySection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <QualityShowcase />
      <ProductShowcase />
      <RitualSection />
      <BenefitsGrid />
      <ScienceSection />
      <IngredientsSection />
      <TestimonialsSection />
      <PhilosophySection />
      <SustainabilitySection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <Toaster position="bottom-right" />
    </main>
  );
}
