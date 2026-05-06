import { Navbar } from "@/components/navbar";
import { 
  HeroSection, 
  SocialProofSection, 
  FeaturesSection, 
  ShowcaseSection, 
  StatsSection, 
  TestimonialSection, 
  CtaSection, 
  Footer 
} from "@/components/landing";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { AdsFactory } from "@/components/AdsFactory";

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <AdsFactory />
        <FeaturesSection />
        <ShowcaseSection />
        <StatsSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
}
