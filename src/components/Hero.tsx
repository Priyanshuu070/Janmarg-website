import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Janmarg - Jan Accessible Network
            <span className="text-primary block">
              for Mobilization Accountability, Reform & Governance
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Serving the people of Jharkhand through accessible governance. A
            comprehensive platform for transparent civic engagement,
            accountability, and democratic participation that bridges the gap
            between Jharkhand government and its citizens.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 dark:hover:bg-primary/80 text-primary-foreground text-lg px-8 py-6 border border-primary/20 hover:border-primary/40 dark:border-primary/30 dark:hover:border-primary/50 transition-all duration-200"
              aria-label="Choose your access type to get started"
              onClick={() =>
                document
                  .getElementById("user-type-selector")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-2"
              aria-label="Learn how the platform works"
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn How It Works
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Transparent Process
              </h3>
              <p className="text-muted-foreground">
                Every report is publicly visible with real-time status updates
                and government responses.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Community Driven
              </h3>
              <p className="text-muted-foreground">
                Citizens can support reports, add evidence, and track resolution
                progress together.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Accountable Results
              </h3>
              <p className="text-muted-foreground">
                Government bodies respond directly with action plans and
                completion timelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
