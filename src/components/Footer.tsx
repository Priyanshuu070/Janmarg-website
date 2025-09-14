import { FileText, Mail, Phone, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">CivicConnect</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Connecting citizens with government through transparent civic issue reporting. 
              Building stronger communities through accountability and collaboration.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@civicconnect.gov</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>1-800-CIVIC-01 (1-800-248-4201)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#submit" className="text-muted-foreground hover:text-primary transition-colors">
                  Submit Issue
                </a>
              </li>
              <li>
                <a href="#reports" className="text-muted-foreground hover:text-primary transition-colors">
                  View Reports
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#api" className="text-muted-foreground hover:text-primary transition-colors">
                  Developer API
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                  aria-label="Read our privacy policy"
                >
                  Privacy Policy
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                  aria-label="Read our terms of service"
                >
                  Terms of Service
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="/accessibility" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                  aria-label="Learn about our accessibility commitment"
                >
                  Accessibility
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://government.local/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                  aria-label="Contact your local government directly"
                >
                  Government Contact
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} CivicConnect. A public service platform operated by local government.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">
              WCAG 2.1 AA Compliant
            </span>
            <span className="text-sm text-muted-foreground">
              Open Source
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;