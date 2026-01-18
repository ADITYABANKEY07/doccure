import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft,ChevronRight } from "lucide-react";

const Doctors = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  // GSAP Hover Animations for Doctor Cards
  const onMouseEnter = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".doc-img");
    gsap.to(card, {
      y: -10,
      shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
      duration: 0.3,
    });
  };

  const onMouseLeave = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".doc-img");
    gsap.to(card, {
      y: 0,
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      duration: 0.3,
    });
  };

  return (
    <div className="bg-[#f9fafb] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Our Best Doctors</h2>
          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="bg-white p-3 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-all border border-gray-100"
            >
              <ChevronLeft />
            </button>
            <button
              ref={nextRef}
              className="bg-white p-3 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-all border border-gray-100"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {docImg.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="bg-white rounded-2xl shadow-md overflow-hidden relative border border-gray-100 cursor-pointer"
              >
                {/* Price badge */}
                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm text-sm font-normal text-black">
                  ${item.fees}
                </div>

                {/* Doctor Image Container */}
                <div className="overflow-hidden h-72">
                  <img
                    className="doc-img w-full h-full object-cover transition-transform"
                    src={item.img}
                    alt={item.name}
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                    {item.name}
                  </h4>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-500">★</span>

                    <span className="font-medium">{item.rating}</span>

                    <span className="text-gray-500 text-sm">
                      ({item.peoplecount})
                    </span>
                  </div>

                  <button className="w-full mt-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all">
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
