import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Send, Twitter } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerData = {
    documentation: ["Medical", "Operation", "Laboratory", "ICU"],
    treatments: ["Neurology", "Cardiologist", "Dentist", "Urology"],
    specialities: ["Neurology", "Cardiologist", "Dentist", "Urology"],
    utilities: ["Medical", "Operation", "Laboratory", "ICU"],
  };

const footerRef = useRef(null);
  const location = useLocation(); // Track page changes

useGSAP(() => {
  gsap.from(".footer-column", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: footerRef.current,
      start: "top bottom",
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
    },
  });
}, { dependencies: [location.pathname], scope: footerRef });


  return (
    <footer ref={footerRef} className="bg-[#eaf4ff] pt-12">
      <div className="container mx-auto px-6">
        {/* 2. MIDDLE SECTION: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-12">
          {/* Dynamic Links columns */}
          {Object.entries(footerData).map(([category, items]) => (
            <div key={category} className="footer-column flex flex-col">
              <h3 className="text-lg font-bold text-txtone mb-6 capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li key={index}>
                    <Link
                      to="#"
                      className="text-slate-600 hover:text-blue-600 transition-colors text-sm md:text-base"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter (The 5th Column) */}
          <div className="footer-column col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold text-txtone mb-6 capitalize">
              Newsletter
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Subscribe to get the latest medical updates.
            </p>
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent px-3 py-2 w-full outline-none text-sm"
              />
              <button className="flex items-center gap-4 text-sm bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-md text-white">
                <Send size={16} />
                Send
              </button>
            </div>
            <div className="md:mt-5">
              <h3 className="text-lg font-bold text-txtone mb-6 capitalize">
                Connect With Us
              </h3>
              <div className="sociallink flex gap-5">
                <Facebook className="w-10 h-10 p-2 rounded-full bg-[#e2edff] shadow-2xl text-gray-700" />
                <Twitter className="w-10 h-10 p-2 rounded-full bg-[#e2edff] shadow-2xl text-gray-700" />
                <Instagram className="w-10 h-10 p-2 rounded-full bg-[#e2edff] shadow-2xl text-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM BAR */}
      <hr className="border-gray-200" />
      <div className="bg-[#e2edff] py-6 px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-700 text-sm">
            &copy; {new Date().getFullYear()} DocEase. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-700">
            <Link to="/terms" className="hover:text-blue-600">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-blue-600">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
