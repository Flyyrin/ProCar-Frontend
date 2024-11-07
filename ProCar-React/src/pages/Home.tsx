import Header from "../components/Header";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import Helmet from "react-helmet";
import "../styles/Carousel.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/listing/1e3b234c-b006-409a-b9fa-da4397774693", {
  //     replace: true,
  //     state: { listing_placed: true },
  //   });
  // });

  return (
    <>
      <Helmet>
        <title>Ontdek - ProCar</title>
      </Helmet>
      <Header />
      <p>Home</p>
      <Footer />
    </>
  );
}

export default Home;
