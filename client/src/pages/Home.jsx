import React from "react";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Slider />
      <Brands />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
