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
    <section id="how-it-works" className="w-full py-16 md:py-20 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-4 leading-tight font-['Poppins']">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed font-['Inter'] font-light">
            A simple, transparent process that connects citizens with their government for effective civic issue resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-[#EFEFEF] rounded-lg p-6 h-full" style={{boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'}}>
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-[#2E6A56] stroke-1" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#2E6A56] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-md font-semibold text-[#2E6A56] mb-2 font-['Poppins']">
                  {step.title}
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed font-['Inter']">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;