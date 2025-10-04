import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Smartphone, 
  Shield, 
  Users, 
  MapPin, 
  Bell, 
  BarChart3, 
  Download, 
  LogIn,
  CheckCircle,
  Star,
  ArrowRight,
  Globe,
  Lock,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "Real-time Reporting",
      description: "Report civic issues instantly with location-based mapping and photo documentation."
    },
    {
      icon: Bell,
      title: "Smart Notifications", 
      description: "Get instant updates on report status, government responses, and community activities."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and data visualization for administrators and citizens."
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Connect with local communities and participate in democratic decision-making."
    },
    {
      icon: Shield,
      title: "Secure & Verified",
      description: "Government-grade security with verified user authentication and data protection."
    },
    {
      icon: Zap,
      title: "Fast Response",
      description: "Quick resolution tracking with automated workflow and priority management."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Citizens" },
    { number: "15K+", label: "Issues Resolved" },
    { number: "98%", label: "User Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-[#2E6A56]/8 to-emerald-400/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-br from-emerald-300/6 to-[#2E6A56]/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-green-300/8 to-teal-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-gradient-to-br from-teal-300/6 to-[#2E6A56]/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b shadow-sm border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#2E6A56] flex items-center justify-center">
                <img src="/janmarg.png" alt="Janmarg Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold text-[#2E6A56] font-['Poppins']">
                JANMARG
              </span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
              <ThemeToggle />
              <Button
                onClick={() => navigate("/admin")}
                variant="ghost"
                className="text-[#2E6A56] hover:text-[#1f4a3a] font-medium font-['Poppins']"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Hero Section Leaf Elements - Darker */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-8 h-8 text-[#2E6A56]/60 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '4s'}}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
            </svg>
          </div>
          
          <div className="absolute top-1/3 right-1/4 w-6 h-6 text-emerald-600/70 animate-pulse" style={{animationDelay: '1s', animationDuration: '3s'}}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full rotate-45">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
            </svg>
          </div>
          
          <div className="absolute top-1/2 left-16 w-7 h-7 text-green-700/50 animate-pulse" style={{animationDelay: '3s', animationDuration: '3.5s'}}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full rotate-12">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
            </svg>
          </div>
          
          <div className="absolute top-40 right-16 w-5 h-5 text-[#2E6A56]/55 animate-pulse" style={{animationDelay: '1.5s', animationDuration: '3s'}}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full -rotate-45">
              <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M12,4A1,1 0 0,0 11,5V11A1,1 0 0,0 12,12A1,1 0 0,0 13,11V5A1,1 0 0,0 12,4M7,9V15A5,5 0 0,0 12,20A5,5 0 0,0 17,15V9H19V15A7,7 0 0,1 12,22A7,7 0 0,1 5,15V9H7Z"/>
            </svg>
          </div>
          
          <div className="absolute bottom-32 right-1/3 w-6 h-6 text-emerald-700/65 animate-bounce" style={{animationDelay: '2.5s', animationDuration: '3.8s'}}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full rotate-90">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
            </svg>
          </div>
          
          <div className="absolute bottom-40 left-1/3 w-8 h-8 text-green-800/45 animate-pulse" style={{animationDelay: '4s', animationDuration: '4s'}}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full -rotate-30">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
            </svg>
          </div>
          
          {/* Small decorative elements for hero */}
          <div className="absolute top-28 right-1/2 w-3 h-3 bg-[#2E6A56]/50 rounded-full animate-ping" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-48 left-1/5 w-4 h-4 bg-emerald-600/60 rounded-full animate-ping" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center bg-[#2E6A56]/10 text-[#2E6A56] hover:bg-[#2E6A56]/15 font-['Poppins'] px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
              <Globe className="w-4 h-4 mr-2" />
              Digital Governance Platform
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl lg:text-7xl font-bold text-gray-900 leading-tight font-['Poppins']">
              Connect with your city.
              <span className="text-[#2E6A56] block mt-2">Make it better.</span>
            </h1>
            
            {/* Simplified Description */}
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-['Poppins'] max-w-3xl mx-auto">
              Report issues, track updates, and participate in building stronger communities through digital governance.
            </p>

            {/* Primary CTA - Focused on Citizens */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.connect.janmarg', '_blank')}
                className="bg-[#2E6A56] hover:bg-[#1f4a3a] text-white px-10 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-['Poppins'] group"
              >
                <Download className="w-5 h-5 mr-3" />
                Download Free App
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              {/* Secondary Link - Less Prominent */}
              <button
                onClick={() => navigate("/admin")}
                className="text-[#2E6A56] hover:text-[#1f4a3a] font-medium text-lg font-['Poppins'] flex items-center group transition-all duration-300"
              >
                <Shield className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/70 backdrop-blur-sm border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-3xl lg:text-4xl font-bold text-[#2E6A56] font-['Poppins'] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base text-gray-700 font-['Poppins'] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-[#2E6A56]/10 text-[#2E6A56] font-['Poppins'] px-4 py-2 rounded-full text-sm font-medium">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile App
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 font-['Poppins']">
                Everything you need
                <span className="text-[#2E6A56] block">in your pocket</span>
              </h2>
            </div>
            
            <div className="max-w-md mx-auto">
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2E6A56] to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-['Poppins'] text-gray-900">
                    Janmarg Mobile App
                  </CardTitle>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-600 font-['Poppins']">
                      4.8 (12K+ reviews)
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-emerald-800 font-['Poppins']">Report civic issues instantly</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bell className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-blue-800 font-['Poppins']">Track resolution progress</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-purple-800 font-['Poppins']">Community engagement</span>
                  </div>
                  <div className="pt-4">
                    <Button
                      onClick={() => window.open('https://play.google.com/store/apps/details?id=com.connect.janmarg', '_blank')}
                      className="w-full bg-[#2E6A56] hover:bg-[#1f4a3a] text-white py-3 rounded-lg font-['Poppins'] group transition-all duration-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center bg-[#2E6A56]/10 text-[#2E6A56] font-['Poppins'] px-4 py-2 rounded-full text-sm font-medium">
              Platform Features
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 font-['Poppins'] leading-tight">
              Built for citizens,
              <span className="text-[#2E6A56] block">powered by innovation</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-['Poppins'] leading-relaxed">
              Modern tools that make civic engagement simple, transparent, and effective for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#2E6A56]/20 transition-all duration-300 hover:scale-105 group">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#2E6A56]/10 to-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-[#2E6A56]" />
                  </div>
                  <CardTitle className="text-xl font-['Poppins'] text-gray-900 group-hover:text-[#2E6A56] transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 font-['Poppins'] leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2E6A56] to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E6A56]/95 to-emerald-700/95"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-white font-['Poppins'] leading-tight">
              Ready to make a difference?
            </h2>
            <p className="text-xl lg:text-2xl text-emerald-50 font-['Poppins'] leading-relaxed">
              Join thousands building stronger communities through digital governance.
            </p>
            <div className="pt-4">
              <Button
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.connect.janmarg', '_blank')}
                className="bg-white text-[#2E6A56] hover:bg-gray-100 px-10 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-['Poppins'] group transform hover:scale-105"
              >
                <Download className="w-5 h-5 mr-3" />
                Download Free App
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="pt-4">
              <button
                onClick={() => navigate("/admin")}
                className="text-emerald-100 hover:text-white font-medium text-lg font-['Poppins'] flex items-center justify-center mx-auto group transition-all duration-300"
              >
                <Lock className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Administrator Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#2E6A56] flex items-center justify-center">
                  <img src="/janmarg.png" alt="Janmarg Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xl font-bold font-['Poppins']">JANMARG</span>
              </div>
              <p className="text-gray-400 font-['Poppins']">
                Empowering digital democracy through transparent, efficient, and responsive governance.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-['Poppins']">Quick Links</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.connect.janmarg', '_blank')}
                  className="block text-gray-400 hover:text-white transition-colors font-['Poppins']"
                >
                  Download App
                </button>
                <button 
                  onClick={() => navigate("/admin")}
                  className="block text-gray-400 hover:text-white transition-colors font-['Poppins']"
                >
                  Admin Portal
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-['Poppins']">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p className="font-['Poppins']">support@janmarg.gov.in</p>
                <p className="font-['Poppins']">+91 1800-XXX-XXXX</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="font-['Poppins']">
              © 2025 Janmarg. All rights reserved. | A Digital India Initiative
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;