import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Map, Settings, HelpCircle, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/95 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Janmarg</span>
            </button>
          </div>

          {/* Navigation Links - Different for Landing vs Dashboard */}
          <div className="hidden md:flex items-center space-x-4">
            {isLandingPage ? (
              <>
                <button
                  onClick={() => scrollToSection("user-type-selector")}
                  className="text-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
                >
                  Submit Issue
                </button>
                <button
                  onClick={() => scrollToSection("user-type-selector")}
                  className="text-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
                >
                  View Reports
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
                >
                  How It Works
                </button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="flex items-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center space-x-2"
                >
                  <Map className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help</span>
                </Button>
              </>
            )}
          </div>

          {/* Theme Toggle, Language Selector and CTA */}
          <div className="flex items-center space-x-3">
            <LanguageSelector variant="compact" />
            <ThemeToggle />
            {isLandingPage && (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
                onClick={() => scrollToSection("user-type-selector")}
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
