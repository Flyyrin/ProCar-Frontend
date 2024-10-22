import Header from "../components/Header";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import "../styles/Carousel.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [shareConfirm, setShareConfirm] = useState(false);
  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setShareConfirm(true);
      setTimeout(() => {
        setShareConfirm(false);
      }, 2000);
    });
  };

  const [starConfirm, setStarConfirm] = useState(false);
  const handleStar = () => {
    setStarConfirm(!starConfirm);
  };

  const [descriptionExtended, setDescriptionExtended] = useState(false);
  const handleDescriptionExtend = () => {
    setDescriptionExtended(!descriptionExtended);
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col">
            <div
              id="vehicleAdCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#vehicleAdCarousel"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Pic 0"
                ></button>
                <button
                  type="button"
                  data-bs-target="#vehicleAdCarousel"
                  data-bs-slide-to="1"
                  aria-label="Pic 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#vehicleAdCarousel"
                  data-bs-slide-to="2"
                  aria-label="Pic 2"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="15000">
                  <img
                    src="https://images.marktplaats.com/api/v1/listing-mp-p/images/92/92c23e73-d7e9-4056-9a9e-0b8484510c2e?rule=ecg_mp_eps$_85"
                    alt="..."
                  />
                </div>
                <div className="carousel-item" data-bs-interval="15000">
                  <img
                    src="https://images.marktplaats.com/api/v1/listing-mp-p/images/7b/7b0db25e-92ab-475a-b7de-ab3c7c03cc0b?rule=ecg_mp_eps$_85"
                    alt="..."
                  />
                </div>
                <div className="carousel-item" data-bs-interval="15000">
                  <img
                    src="https://images.marktplaats.com/api/v1/listing-mp-p/images/33/33152175-7dbb-4bbf-9758-99cac11a88bf?rule=ecg_mp_eps$_85"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#vehicleAdCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#vehicleAdCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col col-12 col-xl-4">
            <h4 className="fw-bold mb-0 mt-3 mt-xl-0">
              Audi RS6 Avant 4.0 TFSI Quattro Perfomance / B&O / NL Auto /
            </h4>
            <h5>€72.950,-</h5>
            <NavLink className="link mb-0 highlight click" to="/user/4828">
              <strong>John Parker</strong>
            </NavLink>
            <p className="mb-0">
              <small className="text-muted">Geplaatst 3 dagen geleden</small>
            </p>
            <p>
              <small className="text-muted fw-bold">Nijmegen</small>
            </p>
            {shareConfirm && (
              <Alert
                alertStatus={{
                  type: "success",
                  message: "Advertentie link gekopieerd.",
                }}
              />
            )}
            <div className="d-inline d-sm-flex">
              <div className="d-flex align-items-center justify-content-center btn btn-outline w-100">
                <i className="bi bi-chat h5 mb-0"></i>
                <span className="align-middle ms-2">Stuur bericht</span>
              </div>
              <div
                className="d-flex align-items-center justify-content-center btn btn-outline w-100 mx-sm-2 my-2 my-sm-0"
                onClick={handleStar}
              >
                <i
                  className={`bi bi-star${starConfirm ? "-fill" : ""} h5 mb-0`}
                ></i>
                <span className="align-middle ms-2">
                  {starConfirm ? "Opgeslagen" : "Opslaan"}
                </span>
              </div>
              <div
                className="d-flex align-items-center justify-content-center btn btn-outline w-100"
                onClick={handleShare}
              >
                <i className="bi bi-share h5 mb-0"></i>
                <span className="align-middle ms-2">Delen</span>
              </div>
            </div>
            <div className="w-100 border border-2 mt-2 mb-3"></div>
            <h5>Beschrijving</h5>
            <div className="mb-3">
              {descriptionExtended
                ? "Assistentiepakket inclusief pre sense plus (PCN). Audi RS6 Avant 4.0 TFSI Quattro Perfomance (605PK)Origineel Nederlands geleverde auto met NAP gecontroleerde kilometerstandUniek uitgevoerde en volledig Algemene informatieAantal deuren: 5Modelreeks: 2014 - 2018Modelcode: C7Kleur: Nardo GrijsTechnische informatieVermogen: 445 kW (605 PK)Koppel: 750 NmTransmissie: 8 versnellingen, AutomaatTankinhoud: 75 literAcceleratie (0-100): 3,7 sTopsnelheid: 250 km/uMaten en gewichtenLaadvermogen: 655 kgGVW: 2.580 kgAfmetingen (LxBxH): 498 x 194 x 146 cmWielbasis: 291 cmInterieurInterieurkleur: ZwartAantal zitplaatsen: 5MilieuCO₂-uitstoot: 223 g/kmFijnstofuitstoot: 1,8 mg/kmEnergielabel: FVerbruikBrandstofverbruik in de stad: 13,4 l/100km (1 op 7,5)Brandstofverbruik op de snelweg: 7,4 l/100km (1 op 13,5)Financiële informatieBTW/marge: BTW niet verrekenbaar voor ondernemers (margeregeling)Motorrijtuigenbelasting: € 344 - € 376 per kwartaal"
                : "Assistentiepakket inclusief pre sense plus (PCN). Audi RS6 Avant 4.0 TFSI Quattro Perfomance (605PK)Origineel Nederlands geleverde auto met NAP gecontroleerde kilometerstandUniek uitgevoerde en volledig"}
              {descriptionExtended ? "" : "..."}
              <span
                className="fw-bolder highlight click ms-1"
                onClick={handleDescriptionExtend}
              >
                {descriptionExtended ? "Zie minder" : "Zie meer"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
