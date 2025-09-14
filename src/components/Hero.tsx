import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Report, Track, and Resolve 
            <span className="text-primary block md:inline md:ml-3">
              Civic Issues Transparently
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Empower your community through transparent civic engagement. 
            Citizens and government bodies working together to identify, 
            track, and resolve issues that matter to everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground text-lg px-8 py-6"
              aria-label="Submit your first civic issue report"
            >
              Submit Your First Issue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-2"
              aria-label="View existing civic reports in your area"
            >
              View Existing Reports
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
                Every report is publicly visible with real-time status updates and government responses.
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
                Citizens can support reports, add evidence, and track resolution progress together.
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
                Government bodies respond directly with action plans and completion timelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;