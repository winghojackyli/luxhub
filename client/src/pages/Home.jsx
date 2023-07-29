import React from "react";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import TopSales from "../components/TopSales";
import NewRelease from "../components/NewRelease";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Slider />
      <Brands />
      <NewRelease />
      <TopSales />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
