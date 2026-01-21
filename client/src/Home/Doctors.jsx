import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

const Doctors = () => {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [_, setInit] = useState(false); // Used to force re-render once refs are attached

  const docImg = [
    {
      id: 1,
      name: "Dr Ruby Perrin",
      img: "./doc1.webp",
      rating: "4.1",
      peoplecount: "20",
      fees: "200",
    },
    {
      id: 2,
      name: "Dr Darin Elder",
      img: "./doc2.webp",
      rating: "4.67",
      peoplecount: "12",
      fees: "120",
    },
    {
      id: 3,
      name: "Dr James Amen",
      img: "./doc3.webp",
      rating: "3.00",
      peoplecount: "3",
      fees: "130",
    },
    {
      id: 4,
      name: "Dr Saeed Tamer",
      img: "./doc4.jpg",
      rating: "3.5",
      peoplecount: "5",
      fees: "150",
    },
  ];

  const onMouseEnter = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".doc-img");
    gsap.to(card, {
      y: -10,
      shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
      duration: 0.3,
    });
    gsap.to(img, { scale: 1.05, duration: 0.4 });
  };

  const onMouseLeave = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".doc-img");
    gsap.to(card, {
      y: 0,
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      duration: 0.3,
    });
    gsap.to(img, { scale: 1, duration: 0.4 });
  };

  const handleBookClick = (doctorName) => {
    // This navigates to /booking?doctor=Dr%20Darin%20Elder
    navigate(`/booking?doctor=${encodeURIComponent(doctorName)}`);
  };

  

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
            gsap.from(".arrow", {
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
      gsap.from(".innercard", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "top -80%",
          markers: true
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="bg-[#f9fafb] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="textcontent flex flex-col gap-2 md:text-left text-center max-w-xl">
            <h2 className="text-3xl font-bold text-gray-800">
              Book Our <span className="text-blue-600">Best Doctors</span>
            </h2>
            <p className="text-gray-500">
              Access to expert physicians and surgeons, advanced technologies
              and top-quality surgery facilities right here.
            </p>
          </div>

          {/* Custom Navigation */}
          <div className="arrow hidden md:flex gap-3">
            <button
              ref={prevRef}
              className="bg-white p-3 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-all border border-gray-100 active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              ref={nextRef}
              className="bg-white p-3 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-all border border-gray-100 active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          onInit={() => setInit(true)} // Forces re-render to connect navigation refs
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          loopedslides={4} // Ensures enough clones are made for 4 items
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {docImg.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="innercard bg-white rounded-2xl shadow-md overflow-hidden relative border border-gray-100 cursor-pointer h-full"
              >
                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm text-sm font-semibold text-gray-800">
                  ${item.fees}
                </div>

                <div className="overflow-hidden h-64">
                  <img
                    className="doc-img w-full h-full object-cover"
                    src={item.img}
                    alt={item.name}
                  />
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-bold text-gray-700">
                      {item.rating}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ({item.peoplecount} Reviews)
                    </span>
                  </div>
                  <button
                    onClick={() => handleBookClick(item.name)}
                    className="w-full mt-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Doctors;
