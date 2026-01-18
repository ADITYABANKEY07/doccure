import React from "react";
import Hero from "../Home/Hero";
import Specialization from "../Home/Specialization";
import Doctors from "../Home/Doctors";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* Specialization Section */}
      <Specialization />
      {/* Best Doctors */}
      <Doctors/>
    </>
  );
};

export default Home;
