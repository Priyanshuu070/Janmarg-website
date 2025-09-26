import React from "react";
import { Button } from "@/components/ui/button";
import {
  Shield,
  HelpCircle,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../public/janmarg.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b shadow-sm border-gray-200 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src={Logo} alt="Janmarg Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold text-[#2E6A56] font-['Poppins']">
                JANMARG
              </span>
            </div>
          </div>

          {/* Right Side - Minimal Actions */}
          <div className="flex items-center space-x-4">
            {/* Contact Support Link */}
            <a
              href="#"
              className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-[#2E6A56] transition-all duration-200 font-['Poppins'] text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Contact Support</span>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Admin Login Button */}
            {isLandingPage && (
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-[#2E6A56] hover:bg-[#1f4a3a] text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-['Poppins']"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;