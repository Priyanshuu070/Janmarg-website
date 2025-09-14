import { Button } from "@/components/ui/button";
import { FileText, Search, HelpCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">CivicConnect</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#submit" 
            className="text-foreground hover:text-primary transition-colors font-medium"
            aria-label="Submit a new civic issue"
          >
            Submit Issue
          </a>
          <a 
            href="#reports" 
            className="text-foreground hover:text-primary transition-colors font-medium"
            aria-label="View existing reports"
          >
            View Reports
          </a>
          <a 
            href="#how-it-works" 
            className="text-foreground hover:text-primary transition-colors font-medium"
            aria-label="Learn how the platform works"
          >
            How It Works
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            className="hidden sm:flex"
            aria-label="Search existing reports"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button 
            size="sm"
            className="bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;