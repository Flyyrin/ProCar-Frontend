import Helmet from "react-helmet";
import { useState, useEffect } from "react";
import axiosInstance from "../../components/AxiosInstance";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Alert from "../../components/Alert";
import ListingPreview from "../../components/ListingPreview";

function Recents() {
  const [loading, setLoading] = useState(true);
  const [listingData, setListingData] = useState<any[]>([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  function loadNotifications() {
    setLoading(true);
    axiosInstance
      .get(`/user/viewedListings`)
      .then(function (response) {
        if (response.status === 200) {
          setListingData(response.data);
          setApiError(false);
          setLoading(false);
        }
      })
      .catch(function () {
        setApiError(true);
        setLoading(false);
        window.scrollTo(0, 0);
      });
  }

  return (
    <>
      <Helmet>
        <title>Recente Advertenties - ProCar</title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />
      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">
          Recent bekeken advertenties
        </h3>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-9">
            {apiError && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: "Er is iets mis gegaan, probeer het later nog eens.",
                }}
              />
            )}
            {loading ? (
              <ul className="list-group">
                <li className="list-group-item p-4 d-flex justify-content-center align-items-center highlight">
                  <div className="spinner-border" role="status" />
                </li>
              </ul>
            ) : listingData.length > 0 ? (
              <ul className="list-group">
                {listingData.map((listing) => (
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
                    Je hebt nog geen recent bekeken advertenties
                  </p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Recents;
