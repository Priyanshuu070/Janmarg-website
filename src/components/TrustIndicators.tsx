import { Card } from "@/components/ui/card";
import { Clock, MapPin, BarChart3, Users2 } from "lucide-react";

const TrustIndicators = () => {
  const stats = [
    {
      icon: Clock,
      value: "72hrs",
      label: "Average Response Time",
      description: "Government agencies respond within 3 business days"
    },
    {
      icon: MapPin,
      value: "2,847",
      label: "Issues Resolved",
      description: "Successfully closed reports this year"
    },
    {
      icon: BarChart3,
      value: "89%",
      label: "Satisfaction Rate",
      description: "Citizens satisfied with resolution process"
    },
    {
      icon: Users2,
      value: "15K+",
      label: "Active Citizens",
      description: "Community members using the platform"
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Building Trust Through Transparency
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real data, real results. Our platform creates accountability 
            between citizens and government through open, verifiable processes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-foreground mb-2">
                {stat.label}
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-accent/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Open Data Promise
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            All civic issue data is publicly accessible, anonymized for privacy, 
            and available for research, journalism, and civic improvement initiatives. 
            We believe transparency builds better communities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;