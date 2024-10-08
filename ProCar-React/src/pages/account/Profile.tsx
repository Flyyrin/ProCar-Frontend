import Helmet from "react-helmet";
import axiosInstance from "../../components/AxiosInstance";
import { NavLink } from "react-router-dom";
import "../../styles/Login.css";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Profile() {
  return (
    <>
      <Helmet>
        <title>Mijn profiel - ProCar</title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />

      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">
          Mijn profiel
        </h3>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-10">
            <div className="card">
              <div className="card-body">
                <div className="row info-row d-flex align-items-center my-2">
                  <div className="col-md-3 col-5">
                    <p className="text-muted mb-0">Gebruikersnaam</p>
                  </div>
                  <div className="col">
                    <p className="mb-0 fw-bold d-flex">
                      Rafael{" "}
                      <NavLink
                        className="mb-0 btn-outline border-0 ms-auto"
                        to={"/account/change_username"}
                      >
                        <strong>Wijzigen</strong>
                      </NavLink>
                    </p>
                  </div>
                </div>
                <div className="row info-row d-flex align-items-center my-2">
                  <div className="col-md-3 col-5">
                    <p className="text-muted mb-0">E-mailadres</p>
                  </div>
                  <div className="col">
                    <p className="mb-0 fw-bold d-flex">
                      mail@mail.com{" "}
                      <NavLink
                        className="mb-0 btn-outline border-0 ms-auto"
                        to={"/account/change_email"}
                      >
                        <strong>Wijzigen</strong>
                      </NavLink>
                    </p>
                  </div>
                </div>
                <div className="row info-row d-flex align-items-center my-2">
                  <div className="col-md-3 col-5">
                    <p className="text-muted mb-0">Wachtwoord</p>
                  </div>
                  <div className="col">
                    <p className="mb-0 fw-bold d-flex">
                      *******{" "}
                      <NavLink
                        className="mb-0 btn-outline border-0 ms-auto"
                        to={"/account/change_password"}
                      >
                        <strong>Wijzigen</strong>
                      </NavLink>
                    </p>
                  </div>
                </div>
                <div className="row info-row d-flex align-items-center my-2">
                  <div className="col-md-3 col-5">
                    <p className="text-muted mb-0">Actief sinds</p>
                  </div>
                  <div className="col">
                    <p className="mb-0 fw-bold d-flex">10 april 2005</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
