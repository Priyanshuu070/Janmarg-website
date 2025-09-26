import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            CivicConnect
          </span>
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
          <ThemeToggle />
          <Button
            size="sm"
            className="bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <Link to="/dashboard" aria-label="Get started with CivicConnect">
              Admin Login
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
