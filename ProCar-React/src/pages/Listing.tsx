import Header from "../components/Header";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import Helmet from "react-helmet";
import searchImage from "../assets/search.png";
import "../styles/Carousel.css";
import { NavLink, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../components/AxiosInstance";

function timeAgo(timestamp: string | number): string {
  const now = new Date();
  const differenceInSeconds = Math.floor(
    (now.getTime() - new Date(timestamp).getTime()) / 1000
  );

  const secondsInMinute = 60;
  const secondsInHour = 60 * 60;
  const secondsInDay = 60 * 60 * 24;

  if (differenceInSeconds < secondsInMinute) {
    return "Nu";
  } else if (differenceInSeconds < secondsInHour) {
    const minutes = Math.floor(differenceInSeconds / secondsInMinute);
    return `${minutes} minuut${minutes === 1 ? "" : "en"} geleden`;
  } else if (differenceInSeconds < secondsInDay) {
    const hours = Math.floor(differenceInSeconds / secondsInHour);
    return `${hours} uur geleden`;
  } else {
    const days = Math.floor(differenceInSeconds / secondsInDay);
    return `${days} dag${days === 1 ? "" : "en"} geleden`;
  }
}

function Listing() {
  const { listingId } = useParams();

  const location = useLocation();
  const [listingPlaced] = useState(location.state?.listing_placed);

  const navigate = useNavigate();
  useEffect(() => {
    navigate(location.search, { replace: true, state: {} });
  }, [navigate, location.pathname]);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(location.state?.api_error);
  const [listingData, setListingData] = useState<Record<string, any>>({});
  useEffect(() => {
    axiosInstance
      .get(`/GetListing?listingId=${listingId}`)
      .then(function (response) {
        if (response.status === 200) {
          if (response.data) {
            setListingData(response.data);
          }
          setApiError(false);
          setLoading(false);
        }
      })
      .catch(function () {
        setApiError(true);
        setLoading(false);
        window.scrollTo(0, 0);
      });
  }, []);

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
      <Helmet>
        <title>
          {(Object.keys(listingData).length as number) != 0
            ? listingData?.title
            : "Advertentie"}{" "}
          - ProCar
        </title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />
      <div className="container-fluid mt-4">
        {apiError && (
          <Alert
            alertStatus={{
              type: "danger",
              message: "Er is iets mis gegaan, probeer het later nog eens.",
            }}
          />
        )}
        {listingPlaced && (
          <Alert
            alertStatus={{
              type: "success",
              message: "Advertentie met succes geplaats.",
            }}
          />
        )}
        {apiError ? (
          <></>
        ) : loading ? (
          <>
            <ul className="list-group m-5 p-5">
              <li className="list-group-item p-4 d-flex justify-content-center align-items-center highlight">
                <div className="spinner-border" role="status" />
              </li>
            </ul>
          </>
        ) : (Object.keys(listingData).length as number) == 0 ? (
          <>
            <div className="container-fluid pt-5 text-center">
              <h3 className="fw-bold my-5">
                We konden deze advertentie niet vinden.
              </h3>
              <div className="row d-flex justify-content-center">
                <div className="col-md-3 col-sm-6 col-8">
                  <img src={searchImage} alt="search" className="img-fluid" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
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
                      aria-label="Pic 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#vehicleAdCarousel"
                      data-bs-slide-to="1"
                      aria-label="Pic 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#vehicleAdCarousel"
                      data-bs-slide-to="2"
                      aria-label="Pic 3"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#vehicleAdCarousel"
                      data-bs-slide-to="3"
                      aria-label="Pic 4"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#vehicleAdCarousel"
                      data-bs-slide-to="4"
                      aria-label="Pic 5"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div
                      className="carousel-item active"
                      data-bs-interval="15000"
                    >
                      <div className="d-flex justify-content-center h-100">
                        <img src={listingData?.image1Path} alt="..." />{" "}
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="15000">
                      <div className="d-flex justify-content-center h-100">
                        <img src={listingData?.image2Path} alt="..." />{" "}
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="15000">
                      <div className="d-flex justify-content-center h-100">
                        <img src={listingData?.image3Path} alt="..." />{" "}
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="15000">
                      <div className="d-flex justify-content-center h-100">
                        <img src={listingData?.image4Path} alt="..." />
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="15000">
                      <div className="d-flex justify-content-center h-100">
                        <img src={listingData?.image5Path} alt="..." />
                      </div>
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
                  {listingData?.title}
                </h4>
                <h5>{listingData?.price}</h5>
                <NavLink className="link mb-0 highlight click" to="/user/4828">
                  <strong>{listingData?.userName}</strong>
                </NavLink>
                <p className="mb-0">
                  <small className="text-muted">
                    Geplaatst {timeAgo(listingData?.createdDate)}
                  </small>
                </p>
                <p>
                  <small className="text-muted fw-bold">
                    {listingData?.postal} - {listingData?.city}
                  </small>
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
                      className={`bi bi-star${
                        starConfirm ? "-fill" : ""
                      } h5 mb-0`}
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
                    ? listingData?.description
                    : listingData?.descriptionShort}{" "}
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Listing;
