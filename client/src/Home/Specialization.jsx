import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger)

const Specialization = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const specialIcon = [
    { id: 1, title: "Cardiologist", img: "./cardiologyicon.svg" },
    { id: 2, title: "Dentist", img: "./dentisticon.svg" },
    { id: 3, title: "Laboratory", img: "./labicon.svg" },
    { id: 4, title: "Neurology", img: "./neurologyicon.svg" },
    { id: 5, title: "Ophthalmology", img: "./ophthalmologyicon.svg" },
    { id: 6, title: "Orthopedic", img: "./orthopedicicon.svg" },
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
        },
      });
    },
    { scope: containerRef },
  );

  // GSAP Animation Logic
  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    const iconContainer = card.querySelector(".icon-container");
    const icon = card.querySelector("img");
    const text = card.querySelector("h3");

    const tl = gsap.timeline();

    tl.to(card, {
      backgroundColor: "#2563eb",
      borderColor: "#2563eb",
      duration: 0.3,
    })
      .to(
        iconContainer,
        {
          rotateY: 180,
          backgroundColor: "rgba(255,255,255,0.2)",
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        0,
      )
      .to(icon, { filter: "brightness(0) invert(1)", duration: 0.3 }, 0)
      .to(text, { color: "#ffffff", duration: 0.3 }, 0);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const iconContainer = card.querySelector(".icon-container");
    const icon = card.querySelector("img");
    const text = card.querySelector("h3");

    const tl = gsap.timeline();

    tl.to(card, {
      backgroundColor: "#ffffff",
      borderColor: "#d1d5db",
      duration: 0.3,
    })
      .to(
        iconContainer,
        { rotateY: 0, backgroundColor: "#f2f6f6", duration: 0.4 },
        0,
      )
      .to(icon, { filter: "brightness(1) invert(0)", duration: 0.3 }, 0)
      .to(text, { color: "#000000", duration: 0.3 }, 0);
  };

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="textcontent flex flex-col gap-5  md:text-left text-center">
          <h1 className="text-3xl font-semibold">
            Clinic & <span className="text-primary">Specialities</span>{" "}
          </h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="arrow hidden md:flex gap-3">
          <button
            ref={prevRef}
            className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200 transition active:scale-95"
          >
            <ChevronLeft />
          </button>
          <button
            ref={nextRef}
            className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200 transition active:scale-95"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {specialIcon.map((item) => (
          <SwiperSlide key={item.id} className="py-4">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="innercard w-full h-60 border border-gray-300 rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm cursor-pointer bg-white"
            >
              <div className="icon-container bg-[#f2f6f6] p-5 rounded-full mb-4">
                <img
                  className="w-14 h-14 object-contain"
                  src={item.img}
                  alt={item.title}
                />
              </div>
              <h3 className="text-center font-semibold transition-colors">
                {item.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Specialization;
