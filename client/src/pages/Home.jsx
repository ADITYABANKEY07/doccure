import React from "react";
import Hero from "../Home/Hero";
import Specialization from "../Home/Specialization";
import Doctors from "../Home/Doctors";
import Marquee from "../Home/Marquee";
import QuickLooking from "../Home/QuickLooking";
import Faq from "../Home/Faq";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* What are you looking for */}
      <QuickLooking/>
      {/* Specialization Section */}
      <Specialization />
      {/* Marquee Section */}
      <Marquee/>
      {/* Best Doctors */}
      <Doctors/>
      {/* Frequently asked Question */}
      <Faq/>
    </>
  );
};

export default Home;
