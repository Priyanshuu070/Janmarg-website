import { Card } from "@/components/ui/card";
import { 
  Camera, 
  MapPin, 
  Bell, 
  Vote, 
  MessageCircle, 
  BarChart, 
  Clock, 
  Shield,
  Smartphone,
  Globe,
  Users,
  Zap
} from "lucide-react";

const Features = () => {
  const citizenFeatures = [
    {
      icon: Camera,
      title: "Photo Evidence",
      description: "Capture and attach multiple photos to document issues clearly and provide visual evidence."
    },
    {
      icon: MapPin,
      title: "Precise Location",
      description: "GPS-enabled location tagging ensures issues are reported to the correct department and area."
    },
    {
      icon: Bell,
      title: "Real-time Updates",
      description: "Get instant notifications when your reports receive responses or status updates."
    },
    {
      icon: Vote,
      title: "Community Support",
      description: "Vote and show support for issues that matter to you and your neighborhood."
    }
  ];

  const govFeatures = [
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into issue trends, response times, and citizen satisfaction metrics."
    },
    {
      icon: MessageCircle,
      title: "Public Communication",
      description: "Respond to citizens transparently with progress updates and resolution timelines."
    },
    {
      icon: Clock,
      title: "Workflow Management",
      description: "Track response times, assign teams, and manage resolution workflows efficiently."
    },
    {
      icon: Shield,
      title: "Verified Responses",
      description: "Official verification system ensures authentic government responses and accountability."
    }
  ];

  const platformFeatures = [
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Optimized mobile experience for citizens to report issues anytime, anywhere with offline capability."
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Available in multiple languages to serve diverse communities effectively."
    },
    {
      icon: Users,
      title: "Accessibility Focused",
      description: "WCAG 2.1 AA compliant design ensures platform accessibility for all citizens."
    },
    {
      icon: Zap,
      title: "API Integration",
      description: "Open API allows integration with existing government systems and third-party applications."
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Citizen Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Citizen Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to make civic engagement simple, effective, and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {citizenFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Government Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Government Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive management tools for efficient civic issue resolution and citizen communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {govFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Features */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with modern technology and accessibility standards to serve everyone in your community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/30 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;