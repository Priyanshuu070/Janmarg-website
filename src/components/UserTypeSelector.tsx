import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Building2, ArrowRight, Users, BarChart3, MapPin, FileText, CheckCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserTypeSelector = () => {
  const navigate = useNavigate();

  const handleCitizenClick = () => {
    // Redirect to Janmarg web app
    window.open("https://janmarg-web.vercel.app/", "_blank");
  };

  const handleCivicBodyClick = () => {
    // Redirect to main backend dashboard
    window.open("https://dashboard.civicconnect.gov", "_blank");
  };

  const handleDashboardClick = () => {
    navigate("/login");
  };

  return (
    <section
      id="user-type-selector"
      className="w-full py-20 md:py-28 bg-white relative"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6 leading-tight font-['Poppins']">
            Choose Your Access Type
          </h2>
          <p className="text-xl md:text-2xl text-[#4A4A4A] max-w-3xl mx-auto leading-relaxed font-['Inter'] font-light">
            Experience different interfaces designed for different needs. Join thousands in making our communities better.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Citizen Access */}
          <Card className="relative p-10 hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white">
            <div className="relative z-10">
              <div className="w-24 h-24 bg-[#2E6A56]/10 rounded-lg flex items-center justify-center mx-auto mb-8">
                <Smartphone className="w-12 h-12 text-[#2E6A56]" />
              </div>
              <h3 className="text-3xl font-bold text-[#4A4A4A] mb-6 leading-tight font-['Poppins']">
                Citizen Access
              </h3>
              <p className="text-lg text-[#4A4A4A] mb-8 leading-relaxed font-['Inter']">
                Report civic issues, track progress, and engage with your local government through our intuitive mobile app.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#EFEFEF]">
                  <div className="w-8 h-8 bg-[#2E6A56]/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#2E6A56]" />
                  </div>
                  <span className="text-sm font-medium text-[#4A4A4A]">Submit Reports</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#EFEFEF]">
                  <div className="w-8 h-8 bg-[#5C9479]/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#2E6A56]" />
                  </div>
                  <span className="text-sm font-medium text-[#4A4A4A]">Track Progress</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#EFEFEF]">
                  <div className="w-8 h-8 bg-[#2E6A56]/20 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#2E6A56]" />
                  </div>
                  <span className="text-sm font-medium text-[#4A4A4A]">Community View</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#EFEFEF]">
                  <div className="w-8 h-8 bg-[#5C9479]/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-[#2E6A56]" />
                  </div>
                  <span className="text-sm font-medium text-[#4A4A4A]">Get Updates</span>
                </div>
              </div>

              <Button
                onClick={handleCitizenClick}
                size="lg"
                className="w-full bg-[#2E6A56] hover:bg-[#1f4a3a] text-white text-lg py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                Download Mobile App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Civic Body Access */}
          <Card className="relative p-10 hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white">
            <div className="relative z-10">
              <div className="w-24 h-24 bg-[#5C9479]/20 rounded-lg flex items-center justify-center mx-auto mb-8">
                <Building2 className="w-12 h-12 text-[#2E6A56]" />
              </div>
              <h3 className="text-3xl font-bold text-[#4A4A4A] mb-6 leading-tight font-['Poppins']">
                Civic Body Dashboard
              </h3>
              <p className="text-lg text-[#4A4A4A] mb-8 leading-relaxed font-['Inter']">
                Comprehensive management platform for government agencies to review, assign, and resolve citizen reports.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#EFEFEF]">
                  <div className="w-8 h-8 bg-[#2E6A56]/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-[#2E6A56]" />
                  </div>
                  <span className="text-sm font-medium text-[#4A4A4A]">Analytics Hub</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#EFEFEF]">
                  <div className="w-8 h-8 bg-[#5C9479]/20 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#2E6A56]" />
                  </div>
                  <span className="text-sm font-medium text-[#4A4A4A]">Team Management</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#EFEFEF]">
                  <div className="w-8 h-8 bg-[#2E6A56]/20 rounded-lg flex items-center justify-center">
                    <Settings className="w-4 h-4 text-[#2E6A56]" />
                  </div>
                  <span className="text-sm font-medium text-[#4A4A4A]">Workflow Tools</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#EFEFEF]">
                  <div className="w-8 h-8 bg-[#5C9479]/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#2E6A56]" />
                  </div>
                  <span className="text-sm font-medium text-[#4A4A4A]">Report Export</span>
                </div>
              </div>

              <Button
                onClick={handleDashboardClick}
                size="lg"
                className="w-full bg-[#2E6A56] hover:bg-[#1f4a3a] text-white text-lg py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                Access Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-[#EFEFEF] rounded-lg p-6 border border-gray-200">
            <p className="text-lg text-[#4A4A4A] mb-2 font-['Inter']">
              Need help determining which access type is right for you?
            </p>
            <a
              href="mailto:notharsh05@gmail.com"
              className="text-[#2E6A56] hover:text-[#1f4a3a] font-semibold text-lg transition-colors"
            >
              Contact our support team →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTypeSelector;
