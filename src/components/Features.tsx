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
  Zap,
  ArrowRight
} from "lucide-react";

const Features = () => {
  const citizenFeatures = [
    {
      icon: Camera,
      title: "Photo Evidence",
      description: "Capture and attach multiple photos to document issues clearly and provide visual evidence.",
      highlight: "Visual Documentation"
    },
    {
      icon: MapPin,
      title: "Precise Location",
      description: "GPS-enabled location tagging ensures issues are reported to the correct department and area.",
      highlight: "GPS Accuracy"
    },
    {
      icon: Bell,
      title: "Real-time Updates",
      description: "Get instant notifications when your reports receive responses or status updates.",
      highlight: "Instant Alerts"
    },
    {
      icon: Vote,
      title: "Community Support",
      description: "Vote and show support for issues that matter to you and your neighborhood.",
      highlight: "Collective Voice"
    }
  ];

  const govFeatures = [
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into issue trends, response times, and citizen satisfaction metrics.",
      highlight: "Data-Driven Insights"
    },
    {
      icon: MessageCircle,
      title: "Public Communication",
      description: "Respond to citizens transparently with progress updates and resolution timelines.",
      highlight: "Transparent Updates"
    },
    {
      icon: Clock,
      title: "Workflow Management",
      description: "Track response times, assign teams, and manage resolution workflows efficiently.",
      highlight: "Efficient Processing"
    },
    {
      icon: Shield,
      title: "Verified Responses",
      description: "Official verification system ensures authentic government responses and accountability.",
      highlight: "Verified Authenticity"
    }
  ];

  const platformFeatures = [
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Optimized mobile experience for citizens to report issues anytime, anywhere with offline capability.",
      highlight: "Always Available"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Available in multiple languages to serve diverse communities effectively.",
      highlight: "Inclusive Design"
    },
    {
      icon: Users,
      title: "Accessibility Focused",
      description: "WCAG 2.1 AA compliant design ensures platform accessibility for all citizens.",
      highlight: "Universal Access"
    },
    {
      icon: Zap,
      title: "API Integration",
      description: "Open API allows integration with existing government systems and third-party applications.",
      highlight: "Seamless Integration"
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Citizen Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#2E6A56]/10 text-[#2E6A56] rounded-full text-sm font-medium mb-4">
              For Citizens
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-4 font-['Poppins']">
              Empowerment Tools
            </h2>
            <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed font-['Inter'] font-light">
              Intuitive features designed to make civic engagement effortless and impactful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {citizenFeatures.map((feature, index) => (
              <Card key={index} className="group p-6 bg-[#EFEFEF] border-0" style={{boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'}}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[#2E6A56] stroke-1" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-[#2E6A56] font-semibold uppercase tracking-wider mb-1">
                      {feature.highlight}
                    </div>
                    <h3 className="text-lg font-bold text-[#2E6A56] mb-2 font-['Poppins']">
                      {feature.title}
                    </h3>
                    <p className="text-[#4A4A4A] leading-relaxed text-sm font-['Inter']">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Government Features */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-secondary/80 text-secondary-foreground rounded-full text-sm font-medium mb-4">
              For Government
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Management Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional-grade tools for efficient civic issue resolution and citizen engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {govFeatures.map((feature, index) => (
              <Card key={index} className="group relative p-8 bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-border/50 hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <div className="absolute -inset-2 bg-secondary/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-secondary-foreground font-semibold uppercase tracking-wider mb-2">
                      {feature.highlight}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary-foreground transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-secondary-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Features */}
        <div>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-accent/50 text-accent-foreground rounded-full text-sm font-medium mb-4">
              Platform Excellence
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Technical Foundation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Modern, accessible, and scalable architecture built for reliability and growth
            </p>
          </div>

          {/* Large Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="group relative p-10 bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/20 hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-10 h-10 text-accent-foreground" />
                    </div>
                    <div className="absolute -inset-3 bg-accent/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-sm text-accent-foreground font-semibold uppercase tracking-wider mb-3">
                    {feature.highlight}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent-foreground transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-6 h-6 text-accent-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;