import Helmet from "react-helmet";
import axiosInstance from "../components/AxiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import searchImage from "../assets/search.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import ListingPreview from "../components/ListingPreview";

function User() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [invalidError, setInvalidError] = useState(false);
  const [userData, setUserData] = useState<Record<string, any>>({});
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/GetUserProfileInfo?userId=${userId}`)
      .then(function (response) {
        if (response.status === 200) {
          setUserData(response.data);
          setApiError(false);
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setInvalidError(true);
        } else {
          setApiError(true);
        }
        setLoading(false);
        window.scrollTo(0, 0);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {" "}
          {(Object.keys(userData).length as number) != 0
            ? userData?.username
            : "Gebruiker"}{" "}
          - ProCar
        </title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />

      {apiError ? (
        <></>
      ) : loading ? (
        <ul className="list-group mt-5">
          <li className="list-group-item p-4 d-flex justify-content-center align-items-center highlight">
            <div className="spinner-border" role="status" />
          </li>
        </ul>
      ) : invalidError ? (
        <>
          <div className="container-fluid pt-5 text-center">
            <h3 className="fw-bold my-5">
              We konden deze gebruiker niet vinden.
            </h3>
            <div className="row d-flex justify-content-center">
              <div className="col-md-3 col-sm-6 col-8">
                <img src={searchImage} alt="search" className="img-fluid" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container mt-4">
          <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">
            {(Object.keys(userData).length as number) != 0
              ? userData?.username
              : "Profiel"}
          </h3>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 col-md-10">
              {apiError && (
                <Alert
                  alertStatus={{
                    type: "danger",
                    message:
                      "Er is iets mis gegaan, probeer het later nog eens.",
                  }}
                />
              )}
              <div className="card">
                <div className="card-body">
                  <div className="row info-row d-flex align-items-center my-2">
                    <div className="col col-12 col-md-4 col-xl-3 col-xxl-2">
                      <p className="text-muted mb-0">Gebruikersnaam</p>
                    </div>
                    <div className="col col-12 col-md-8 col-xl-9 col-xxl-10">
                      <p className="mb-0 fw-bold d-flex">
                        {userData?.username}
                      </p>
                    </div>
                  </div>
                  <div className="row info-row d-flex align-items-center my-2">
                    <div className="col col-12 col-md-4 col-xl-3 col-xxl-2">
                      <p className="text-muted mb-0">Actief sinds</p>
                    </div>
                    <div className="col col-12 col-md-8 col-xl-9 col-xxl-10">
                      <p className="mb-0 fw-bold d-flex">
                        {userData?.active_since}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="fw-bold my-4 ps-2 mb-2">Advertenties</h4>
              {userData?.listings.length > 0 ? (
                <ul className="list-group">
                  {userData?.listings.map((listing: Record<string, any>) => (
                    <ListingPreview
                      listingData={listing}
                      edit={false}
                      key={listing.listingId}
                    />
                  ))}
                </ul>
              ) : (
                <ul className="list-group">
                  <li className="list-group-item p-4">
                    <p className="text-center m-0">
                      Gebruiker heeft geen actieve advertenties
                    </p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default User;
