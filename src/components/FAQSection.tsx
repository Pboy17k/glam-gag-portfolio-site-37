
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How far in advance should I book my makeup session?",
      answer: "We recommend booking at least 2-3 weeks in advance for regular sessions and 4-6 weeks for bridal makeup to ensure availability, especially during peak seasons."
    },
    {
      question: "Do you provide makeup for all skin tones?",
      answer: "Yes! We specialize in makeup for all skin tones and have a comprehensive range of products to match every complexion perfectly."
    },
    {
      question: "What's included in a bridal makeup package?",
      answer: "Our bridal package includes consultation, trial session, wedding day makeup, touch-up kit, and gele tying if requested. We also provide on-location services."
    },
    {
      question: "Do you offer makeup training courses?",
      answer: "Yes, we offer professional makeup training courses for beginners and intermediate levels. Our courses cover bridal, casual, and advanced techniques."
    },
    {
      question: "What products do you use?",
      answer: "We use high-end, professional makeup products from renowned brands that are suitable for all skin types and long-lasting for events and photoshoots."
    },
    {
      question: "Can you travel to my location?",
      answer: "Yes, we offer on-location services within Kaduna and surrounding areas. Travel fees may apply depending on the distance."
    },
    {
      question: "How long does a typical makeup session take?",
      answer: "A casual makeup session takes about 45-60 minutes, while bridal makeup can take 90-120 minutes including gele tying if requested."
    },
    {
      question: "What's your cancellation policy?",
      answer: "We require at least 24 hours notice for cancellations. Cancellations made less than 24 hours before the appointment may incur a fee."
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our services
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-background rounded-lg border shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
