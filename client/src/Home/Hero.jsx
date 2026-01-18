import React from 'react'
import gsap from "gsap"; // 1. Import the core gsap object
import { useGSAP } from "@gsap/react"; // 2. Fix package name

const Hero = () => {
      const herodocimg = [
    { id: 1, img: "./herodoc1.webp" },
    { id: 2, img: "./herodoc2.webp" },
    { id: 3, img: "./herodoc3.webp" },
  ];

  const heropatient = [
    { id: 1, img: "./heropatient1.webp" },
    { id: 2, img: "./heropatient2.webp" },
    { id: 3, img: "./heropatient3.webp" },
  ];
    useGSAP(() => {
  const tl = gsap.timeline();

  // Animate the left elements (Card and Heading) together with a stagger
  tl.from(".leftelem", {
    y: 50,
    opacity: 0,
    duration: 2,
    stagger: 0.2, // This makes them come in one after another
    ease: "power3.out",
  });
  
  // Animate the Search Box slightly after the text
  tl.from(".leftsearchbox", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  }, "-=0.4"); // Starts 0.4 seconds before the previous animation ends
  
  // Animate the Right elements (Card and Heading) together with a stagger
  gsap.from(".righthero", {
    y: 70,
    opacity: 0,
    duration: 2,
    stagger: 0.2, // This makes them come in one after another
    ease: "power3.out",
  });

  // Floating Gravity Boxes (Infinite)
  gsap.to(".floatbox", {
    y: -20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    stagger: {
      each: 0.5,
      from: "random"
    }
  });
});
  return (
    <>
              {/* Hero Section */}

    <div className="bg-[#e4efff] relative px-4 md:px-10 md:py-8 overflow-hidden">
      {/* Background Decorative Icons */}
      <img
        className="absolute left-0 top-0 w-24 lg:w-52 z-0"
        src="./docheroicon1.webp"
        alt="left icon"
      />
      <img
        className="hidden md:block absolute right-0 top-0 w-24 lg:w-150 z-0"
        src="./docheroicon2.webp"
        alt="right icon"
      />

      {/* MAIN HERO GRID */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10 min-h-[80vh]">
        {/* LEFT HERO: Text & Appointment Card */}
        <div className="lefthero flex flex-col items-center md:items-start gap-8 order-2 md:order-1">
          {/* Appointment Card */}
          <div className="leftelem bg-white p-3 sm:p-4 rounded-full shadow-md flex items-center justify-center gap-4 w-fit border border-gray-100">
            <div className="flex items-center pl-3">
              {herodocimg.map((item) => (
                <img
                  key={item.id}
                  className="w-10 h-10 sm:w-12 sm:h-12 -ml-4 first:ml-0 rounded-full border-2 border-white object-cover"
                  src={item.img}
                  alt="doctor"
                />
              ))}
            </div>
            <div className="text-black pr-4">
              <h4 className="font-bold text-sm sm:text-base whitespace-nowrap">
                5K+ Appointments
              </h4>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="ri-star-fill text-yellow-400 text-[10px] sm:text-xs"
                    ></i>
                  ))}
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                  5.0 Ratings
                </span>
              </div>
            </div>
          </div>

          {/* Hero Heading */}
          <h1 className="leftelem text-2xl md:text-3xl lg:text-5xl text-nowrap font-bold text-center md:text-left leading-tight">
            Discover Health: Find Your <br className="hidden md:block" />
            <span className="flex items-center justify-center md:justify-start gap-3 mt-2">
              Trusted
              <img
                className="hidden md:block px-4 py-1 w-24 lg:w-32 bg-gradient-to-b from-[#F6F2FF] to-[#CBE2FF] rounded-full border-2 border-white h-10 lg:h-14 object-contain"
                src="./video-1.svg"
                alt=""
              />
              <span className="text-blue-600">Doctors</span> Today
            </span>
          </h1>
          {/* Search Box */}
          <div className="leftelem w-[70vw] md:w-[55vw] max-w-5xl mx-auto md:mt-10">
            <div className="bg-white rounded-2xl md:rounded-full border-2 border-[#0ea5e9] p-4 flex flex-col md:flex-row items-center shadow-sm">
              {/* Section 1: Search Input */}
              <div className="flex-[2] flex items-center px-4 gap-3">
                <i className="ri-hospital-line text-[#002b5b] text-xl"></i>
                <input
                  type="text"
                  placeholder="Search doctors, clinics, hospitals..."
                  className="w-full outline-none text-gray-500 placeholder-gray-400 text-sm md:text-base"
                />
              </div>

              {/* Vertical Divider */}
              <div className="h-10 md:w-px bg-gray-200"></div>

              {/* Section 2: Location Dropdown */}
              <div className="flex-1 flex items-center -mt-8 md:mt-0 px-4 md:px-2 gap-3 justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <i className="ri-map-pin-2-fill text-[#002b5b]"></i>
                  <span className="text-gray-700 text-sm md:text-base">
                    Location
                  </span>
                </div>
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>

              {/* Search Button */}
              <button className="mt-2 md:mt-0 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-all shadow-md">
                <i className="ri-search-line font-bold"></i>
                <span className="font-semibold tracking-wide">Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT HERO: Overlapping Doctor Images */}
        <div className="righthero ml-27 relative hidden md:flex items-end -mt-25 justify-center order-1 md:order-2 w-full h-full min-h-[500px]">
          {/* The Background Shape */}
          <img
            className="w-[85%] md:w-[80%] h-auto max-w-lg object-contain"
            src="./herodocback1.webp"
            alt="background"
          />

          {/* The Doctor (Absolute over Background) */}
          <img
            className="absolute bottom-0 w-[75%] md:w-[65%] z-10 object-contain"
            src="./herodoctor.svg"
            alt="doctor"
          />

          {/* FLOATING BOX: Satisfied Patients */}
          {/* Adjusted position to sit on the left side of the doctor */}
          <div className="floatbox absolute ml-35 top-[50vh] left-0 lg:-left-10 z-20 bg-[#000d1d] p-5 rounded-2xl w-fit flex flex-col items-center justify-center shadow-2xl border border-white/10 scale-90 lg:scale-70">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-4 mb-3">
              {heropatient.map((item) => (
                <img
                  key={item.id}
                  className="lg:w-8 lg:h-8 rounded-full border-2 border-[#000d1d] object-cover"
                  src={item.img}
                  alt="patient"
                />
              ))}
            </div>

            {/* Text Content */}
            <div className="text-center">
              <h3 className="text-white text-xl lg:text-2xl font-bold leading-none">
                15K+
              </h3>
              <p className="text-white/70 text-xs lg:text-sm mt-1 whitespace-nowrap">
                Satisfied Patients
              </p>
            </div>
          </div>

          <div className="floatbox absolute ml-80 h-32 top-[40vh] left-0 lg:-left-10 z-20 bg-white p-5 rounded-2xl w-fit flex flex-col items-center justify-center shadow-2xl border border-white/10 scale-90 lg:scale-70">
            {/* Text Content */}
            <div className="text-center">
              <h3 className="text-black text-xl lg:text-2xl font-bold leading-none">
                1K+
              </h3>
              <p className="text-gray-500 text-xs lg:text-sm mt-1 whitespace-nowrap">
                Appointments <br /> Completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Hero