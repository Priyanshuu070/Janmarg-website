import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UserTypeSelector from "@/components/UserTypeSelector";
import HowItWorks from "@/components/HowItWorks";
import TrustIndicators from "@/components/TrustIndicators";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="bg-background">
        <Hero />
        <div id="user-type-selector">
          <UserTypeSelector />
        </div>
        <TrustIndicators />
        <HowItWorks />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
