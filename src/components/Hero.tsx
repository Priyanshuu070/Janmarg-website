import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="w-full py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/80 rounded-full px-6 py-3 mb-8 border border-[#2E6A56]/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#2E6A56]" />
            <span className="text-sm font-medium text-[#2E6A56]">Empowering Citizens Through Accountability and Transparency</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-[#2E6A56] font-['Poppins'] tracking-tight">
              Janmarg
            </span>
            <br />
            <span className="text-xl md:text-2xl font-medium text-[#4A4A4A] font-['Inter']">
              Jan Accessible Network for Mobilization
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#4A4A4A] mb-10 max-w-3xl mx-auto leading-relaxed font-['Inter'] font-light">
            Connect with your government. Report issues. Track progress. Build better communities together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-[#2E6A56] hover:bg-[#1f4a3a] text-white text-lg px-10 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              aria-label="Choose your access type to get started"
              onClick={() => navigate("/login")}
            >
              Get Started Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-[#2E6A56] text-lg px-10 py-7 border-2 border-[#2E6A56] bg-white hover:bg-[#EFEFEF] rounded-lg transition-all duration-300 font-medium"
              aria-label="Learn how the platform works"
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn How It Works
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 bg-[#EFEFEF] rounded-lg" style={{boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'}}>
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-[#2E6A56] stroke-1" />
              </div>
              <h3 className="text-lg font-bold text-[#2E6A56] mb-3 font-['Poppins']">
                Transparent Process
              </h3>
              <p className="text-[#4A4A4A] leading-relaxed font-['Inter'] text-sm">
                Every report is publicly visible, with real-time status updates and government responses, fostering complete openness.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-[#EFEFEF] rounded-lg" style={{boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'}}>
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-[#2E6A56] stroke-1" />
              </div>
              <h3 className="text-lg font-bold text-[#2E6A56] mb-3 font-['Poppins']">
                Community Driven
              </h3>
              <p className="text-[#4A4A4A] leading-relaxed font-['Inter'] text-sm">
                Citizens can collectively support reports, add evidence, and track resolution progress, amplifying collective impact.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-[#EFEFEF] rounded-lg" style={{boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'}}>
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-[#2E6A56] stroke-1" />
              </div>
              <h3 className="text-lg font-bold text-[#2E6A56] mb-3 font-['Poppins']">
                Accountable Results
              </h3>
              <p className="text-[#4A4A4A] leading-relaxed font-['Inter'] text-sm">
                Government bodies respond directly with clear action plans and completion timelines, ensuring measurable outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
