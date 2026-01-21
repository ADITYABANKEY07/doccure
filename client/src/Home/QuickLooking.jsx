import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import {
  RiStethoscopeLine,
  RiCapsuleLine,
  RiTestTubeLine,
} from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const QuickLooking = () => {
  const carddata = [
    {
      id: 1,
      Icon: RiStethoscopeLine,
      title: "Visit a Doctor",
      para: "We hire the best specialists and best medical services to deliver top-notch diagnostic services for you.",
      color: "text-blue-500",
    },
    {
      id: 2,
      Icon: RiCapsuleLine,
      title: "Find a pharmacy",
      para: "We provide a wide range of medical services, so every person could have the opportunity.",
      color: "text-blue-500",
    },
    {
      id: 3,
      Icon: RiTestTubeLine,
      title: "Find a Lab",
      para: "We use the first-class medical equipment for timely diagnostics of various diseases.",
      color: "text-blue-500",
    },
  ];

  let containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".textcontent", {
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      });
      gsap.from(".card", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "top -80%",
        },
      });
    },
    { scope: containerRef },
  );
  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-4 py-10">
      <div className="textcontent text-center md:text-left">
        <h1 className="text-3xl font-bold mb-4">
          What are you <span className="text-primary">looking</span> for?
        </h1>
        <p className="text-gray-500 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="card grid grid-cols-1 md:grid-cols-3 gap-8">
        {carddata.map((item) => (
          <div
            key={item.id}
            className="group relative p-6 bg-[#f2f9ff] rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
          >
            {/* The Sliding Blue Background */}
            <div className="absolute inset-0 bg-primary w-0 group-hover:w-full transition-all duration-500 ease-out z-0" />

            {/* Content Container (Needs z-10 to stay above the blue background) */}
            <div className="relative z-10">
              <item.Icon
                className={`w-16 h-16 mb-4 transition-colors duration-300 ${item.color} group-hover:text-white`}
              />
              <h1 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-white">
                {item.title}
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/90">
                {item.para}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLooking;
