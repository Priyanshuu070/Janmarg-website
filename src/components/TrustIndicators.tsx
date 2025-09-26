import { Card } from "@/components/ui/card";
import { Clock, MapPin, BarChart3, Users2 } from "lucide-react";

const TrustIndicators = () => {
  const stats = [
    {
      icon: Clock,
      value: "72hrs",
      label: "Average Response Time",
      description: "Government agencies respond within 3 business days",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-600"
    },
    {
      icon: MapPin,
      value: "2,847",
      label: "Issues Resolved",
      description: "Successfully closed reports this year",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-600"
    },
    {
      icon: BarChart3,
      value: "89%",
      label: "Satisfaction Rate",
      description: "Citizens satisfied with resolution process",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-600"
    },
    {
      icon: Users2,
      value: "15K+",
      label: "Active Citizens",
      description: "Community members using the platform",
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-4 leading-tight font-['Poppins']">
            Building Trust Through Transparency
          </h2>
          <p className="text-lg md:text-xl text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed font-['Inter'] font-light">
            Real data, real results. Our platform creates accountability between citizens and government through open, verifiable processes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative p-6 text-center bg-[#EFEFEF] border-0" style={{boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'}}>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-[#2E6A56] stroke-1" />
                </div>
                <div className="text-2xl font-bold text-[#2E6A56] mb-2 font-['Poppins']">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-[#4A4A4A] mb-2 font-['Poppins']">
                  {stat.label}
                </div>
                <p className="text-[#4A4A4A] leading-relaxed font-['Inter'] text-xs">
                  {stat.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <div className="bg-[#EFEFEF] rounded-lg p-8 text-center" style={{boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'}}>
            <h3 className="text-2xl font-bold text-[#4A4A4A] mb-4 font-['Poppins']">
              Open Data Promise
            </h3>
            <p className="text-[#4A4A4A] max-w-3xl mx-auto leading-relaxed font-['Inter']">
              All civic issue data is publicly accessible, anonymized for privacy, and available for research, journalism, and civic improvement initiatives. We believe transparency builds better communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;