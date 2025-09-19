import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I submit a civic issue report?",
      answer: "Download our mobile app from the Google Play Store and create a free account. You can then report issues by taking photos, adding location details, and providing a description. Your report will be immediately visible to the public and relevant government departments."
    },
    {
      question: "Are my reports really public?",
      answer: "Yes, all civic issue reports are publicly visible to ensure transparency and accountability. Personal information is kept private, but the issue details, location, and status updates are accessible to all community members to encourage civic engagement."
    },
    {
      question: "How long does it take for government to respond?",
      answer: "Our average response time is 72 hours (3 business days). Emergency issues are prioritized and typically receive initial responses within 24 hours. You'll receive notifications as soon as there are updates on your report."
    },
    {
      question: "Can I track the progress of my submitted issues?",
      answer: "Absolutely! You'll receive real-time notifications about status changes, government responses, and resolution progress. You can also view detailed timelines and photos of completed work through the mobile app."
    },
    {
      question: "What types of issues can I report?",
      answer: "You can report various civic issues including potholes, broken streetlights, graffiti, damaged public property, trash collection problems, park maintenance issues, and other infrastructure concerns. Emergency services should still be contacted directly for urgent matters."
    },
    {
      question: "Is there a cost to use this platform?",
      answer: "No, CivicConnect is completely free for all citizens. It's a public service platform funded and operated by local government to improve community engagement and civic issue resolution."
    },
    {
      question: "How do I know if my issue is being worked on?",
      answer: "Each report has a clear status indicator showing whether it's been received, assigned to a team, in progress, or completed. Government agencies provide regular updates and photos of work completion to verify resolution."
    },
    {
      question: "Can I support issues reported by other citizens?",
      answer: "Yes! You can view reports in your area and show support for issues that affect you too. Higher community support helps government agencies prioritize which issues to address first."
    },
    {
      question: "What if I'm not satisfied with the government response?",
      answer: "You can provide feedback on resolution quality and escalate concerns through the app. We track satisfaction metrics and use this data to improve service quality. Unresolved issues can be re-opened with additional evidence."
    },
    {
      question: "How is my personal data protected?",
      answer: "We follow strict privacy guidelines and only collect necessary information for issue resolution. Your personal details are never shared publicly - only issue details and locations are visible to maintain transparency while protecting privacy."
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about using CivicConnect to report and track civic issues.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions? 
            <a href="mailto:support@civicconnect.gov" className="text-primary hover:underline ml-1">
              Contact our support team
            </a>
            {" "}or call{" "}
            <a href="tel:1-800-248-4201" className="text-primary hover:underline">
              1-800-CIVIC-01
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;