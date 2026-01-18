import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown, Plus, Minus } from "lucide-react";

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    if (!isOpen) {
      // Opening animation
      gsap.to(contentRef.current, {
        height: "auto",
        duration: 0.5,
        ease: "power2.out",
        opacity: 1,
      });
    } else {
      // Closing animation
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.5,
        ease: "power2.in",
        opacity: 0,
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={toggleAccordion}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-[#052c65] hover:text-gray-500">
          {question}
        </span>
        <span
          className={`transform transition-transform duration-300 
          ${isOpen ? "rotate-180" : ""}
          ${isOpen ? "rounded" : ""}
          ${isOpen ? "text-white" : "text-primary"}
          ${isOpen ? "bg-primary" : "bg-white"}
          `}
        >
          {isOpen ? <Minus className="w-7 h-7" /> : <Plus className="w-7 h-7" />}
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="pt-4 text-gray-600 leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: "How do I book an appointment with a doctor?",
      answer:
        "Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.",
    },
    {
      question: "Can I request a specific doctor when booking my appointment?",
      answer:
        "Yes, you can usually request a specific doctor when booking your appointment, though availability may vary based on their schedule.",
    },
    {
      question:
        "What should I do if I need to cancel or reschedule my appointment?",
      answer:
        "If you need to cancel or reschedule your appointment, contact the doctor as soon as possible to inform them and to reschedule for another available time slot.",
    },
    {
      question: "What if I'm running late for my appointment?",
      answer:
        "If you know you will be late, it's courteous to call the doctor's office and inform them. Depending on their policy and schedule, they may be able to accommodate you or reschedule your appointment.",
    },
    {
      question: "Can I book appointments for family members or dependents?",
      answer:
        "Yes, in many cases, you can book appointments for family members or dependents. However, you may need to provide their personal information and consent to do so.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center md:text-left text-[#272b41]">
        Frequently <span className="text-primary">Asked Questions</span>
      </h2>
      <div className="space-y-2">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default Faq;
