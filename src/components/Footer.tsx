import { FileText, Mail, Phone } from "lucide-react";
import LanguageSelector from "./LanguageSelector";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm border-t border-border/50 relative">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                Janmarg
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Connecting citizens with government through transparent civic issue reporting.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>notharsh05@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span>+91 8826200156</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#user-type-selector"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform duration-200 inline-block"
                >
                  Get Started
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform duration-200 inline-block"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform duration-200 inline-block"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Language & Support */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Language & Support</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Choose your language
                </p>
                <LanguageSelector />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Google Translate
                </p>
                <div id="google_translate_element" className="google-translate-container"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 mt-12 text-center">
          <p className="text-muted-foreground">
            © {currentYear} Janmarg. Building better communities through transparency.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
