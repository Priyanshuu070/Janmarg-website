import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    navigate("/dashboard");
  };
  
  return (
    <section className="w-full min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-blue-50 relative flex items-center">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Login Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 mb-4">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Secure Administrator Access</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-[#2E6A56] font-['Poppins'] tracking-tight">
                  Admin Portal
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 font-light max-w-lg">
                Secure access for Janmarg administrators to manage reports and oversee community solutions.
              </p>
            </div>

            {/* Login Form */}
            <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@janmarg.gov"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-gray-200 focus:border-[#2E6A56] focus:ring-[#2E6A56] text-gray-900"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pr-12 border-gray-200 focus:border-[#2E6A56] focus:ring-[#2E6A56] text-gray-900"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#2E6A56] hover:bg-[#1f4a3a] text-white font-medium text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Secure Login
                </Button>
                
                <div className="text-center">
                  <a 
                    href="#" 
                    className="text-sm text-gray-500 hover:text-[#2E6A56] transition-colors"
                  >
                    Forgot your password?
                  </a>
                </div>
              </form>
            </Card>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative lg:block hidden">
            <div className="relative w-full h-[600px] bg-gradient-to-br from-[#2E6A56]/10 to-blue-100/50 rounded-3xl overflow-hidden">
              {/* Tree Illustration using SVG or the provided image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 relative">
                  {/* Custom Tree and Community Illustration */}
                  <div className="w-full h-full relative bg-gradient-to-b from-blue-100 to-green-100 rounded-2xl overflow-hidden">
                    {/* Sky Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-200/50 to-green-200/30"></div>
                    
                    {/* Tree */}
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                      <div className="w-24 h-32 bg-gradient-to-t from-amber-800 to-amber-700 rounded-t-full relative">
                        {/* Tree Crown */}
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                          <div className="w-40 h-32 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                        </div>
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 -translate-y-4">
                          <div className="w-32 h-24 bg-gradient-to-b from-green-500 to-green-700 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Community figures */}
                    <div className="absolute bottom-8 left-8">
                      <div className="w-8 h-12 bg-blue-600 rounded-t-full"></div>
                      <div className="w-6 h-6 bg-amber-600 rounded-full -mt-2 mx-1"></div>
                    </div>
                    <div className="absolute bottom-8 right-8">
                      <div className="w-8 h-12 bg-red-600 rounded-t-full"></div>
                      <div className="w-6 h-6 bg-amber-600 rounded-full -mt-2 mx-1"></div>
                    </div>
                    <div className="absolute bottom-12 left-1/3">
                      <div className="w-8 h-12 bg-green-600 rounded-t-full"></div>
                      <div className="w-6 h-6 bg-amber-600 rounded-full -mt-2 mx-1"></div>
                    </div>
                    
                    {/* Connection lines */}
                    <div className="absolute inset-0">
                      <svg className="w-full h-full" viewBox="0 0 400 400">
                        <path d="M200 200 L100 300" stroke="#2E6A56" strokeWidth="2" opacity="0.6" />
                        <path d="M200 200 L300 300" stroke="#2E6A56" strokeWidth="2" opacity="0.6" />
                        <path d="M200 200 L150 300" stroke="#2E6A56" strokeWidth="2" opacity="0.6" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-10 left-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
                    <Shield className="w-6 h-6 text-[#2E6A56]" />
                  </div>
                  <div className="absolute top-20 right-16 w-10 h-10 bg-blue-100 rounded-full shadow-md flex items-center justify-center animate-pulse">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="absolute bottom-20 left-20 w-14 h-14 bg-green-100 rounded-full shadow-lg flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
                    <Shield className="w-7 h-7 text-green-600" />
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#2E6A56]/20 to-transparent rounded-full blur-xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-200/30 to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
