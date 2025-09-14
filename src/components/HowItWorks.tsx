import { FileText, Eye, MessageSquare, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Submit Report",
      description: "Describe the civic issue with photos, location, and details. Reports are immediately visible to the public."
    },
    {
      icon: Eye,
      title: "Public Review",
      description: "Community members can view, support, and add additional evidence to strengthen the report."
    },
    {
      icon: MessageSquare,
      title: "Official Response",
      description: "Government bodies review and respond with action plans, timelines, and resource allocation."
    },
    {
      icon: CheckCircle2,
      title: "Track Resolution",
      description: "Follow progress updates until completion. Verified resolution photos confirm issue closure."
    }
  ];

  return (
    <section id="how-it-works" className="w-full py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple, transparent process that connects citizens with their government 
            for effective civic issue resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;