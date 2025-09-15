import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Building2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserTypeSelector = () => {
  const navigate = useNavigate();

  const handleCitizenClick = () => {
    // Redirect to Google Play Store for the mobile app
    window.open(
      "https://play.google.com/store/apps/details?id=com.civicconnect.app",
      "_blank"
    );
  };

  const handleCivicBodyClick = () => {
    // Redirect to main backend dashboard
    window.open("https://dashboard.civicconnect.gov", "_blank");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <section
      id="user-type-selector"
      className="w-full py-16 md:py-20 bg-secondary/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Access Type
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Different interfaces designed for different needs. Citizens use our
            mobile app for reporting and tracking, while civic bodies access
            comprehensive analytics and management tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Citizen Access */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Citizen Access
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Report civic issues, track progress, view community reports, and
              engage with local government through our mobile app. Submit
              photos, locations, and detailed descriptions easily.
            </p>
            <ul className="text-sm text-muted-foreground mb-8 space-y-2 text-left">
              <li>• Submit and track issue reports</li>
              <li>• View community reports in your area</li>
              <li>• Receive notifications on progress</li>
              <li>• Add supporting evidence to reports</li>
              <li>• Mobile-optimized interface</li>
            </ul>
            <Button
              onClick={handleCitizenClick}
              size="lg"
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              Download Mobile App
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>

          {/* Civic Body Access */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
            <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-secondary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Civic Body Dashboard
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Comprehensive management platform for government agencies. Review
              reports, assign teams, track resolution progress, and communicate
              with citizens transparently.
            </p>
            <ul className="text-sm text-muted-foreground mb-8 space-y-2 text-left">
              <li>• Review and prioritize citizen reports</li>
              <li>• Analytics and performance metrics</li>
              <li>• Team assignment and workflow management</li>
              <li>• Public response and update publishing</li>
              <li>• Data export and reporting tools</li>
            </ul>
            <Button
              onClick={handleCivicBodyClick}
              variant="outline"
              size="lg"
              className="w-full border-2 mb-2"
            >
              Access Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={handleDashboardClick}
              size="lg"
              className="w-full bg-primary text-primary-foreground mt-2"
            >
              Dashboard
            </Button>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Need help determining which access type is right for you?
            <a
              href="mailto:support@civicconnect.gov"
              className="text-primary hover:underline ml-1"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserTypeSelector;
