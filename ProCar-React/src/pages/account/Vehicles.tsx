import Helmet from "react-helmet";
import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../components/AxiosInstance";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VehicleItem from "../../components/VehicleItem";
import Alert from "../../components/Alert";

function Vehicles() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState<any[]>([]);

  const [vehicleAdded] = useState(location.state?.vehicle_added);
  const [vehicleDeleted, setVehicleDeleted] = useState(
    location.state?.vehicle_deleted
  );
  const [apiError, setApiError] = useState(location.state?.api_error);
  useEffect(() => {
    setVehicleDeleted(location.state?.vehicle_deleted);
    setApiError(location.state?.api_error);
  }, [location.state]);

  useEffect(() => {
    navigate(location.pathname, { replace: true, state: {} });
  }, [navigate, location.pathname]);

  useEffect(() => {
    axiosInstance
      .get(`/GetUserVehicles`)
      .then(function (response) {
        if (response.status === 200) {
          setVehicleData(response.data);
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

  return (
    <>
      <Helmet>
        <title>Mijn voertuigen - ProCar</title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />
      <div className="container mt-4">
        <h3 className="fw-bold mt-4 mb-3 text-md-center ps-2 ps-md-0">
          Mijn voertuigen
        </h3>
        <NavLink
          className="nav-link m-0 p-0 ps-2 text-md-center"
          to="/account/add_vehicle"
        >
          <div className="btn btn-sm text-white mb-3">Voertuig toevoegen</div>
        </NavLink>
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
            {vehicleAdded && (
              <Alert
                alertStatus={{
                  type: "success",
                  message: "Voertuig met succes toegevoegd.",
                }}
              />
            )}
            {vehicleDeleted && (
              <Alert
                alertStatus={{
                  type: "success",
                  message: "Voertuig met succes verwijderd.",
                }}
              />
            )}
            {loading ? (
              <ul className="list-group">
                <li className="list-group-item p-4 d-flex justify-content-center align-items-center highlight">
                  <div className="spinner-border" role="status" />
                </li>
              </ul>
            ) : vehicleData.length > 0 ? (
              <div className="accordion">
                {vehicleData.map((vehicle) => (
                  <VehicleItem vehicleData={vehicle} />
                ))}
              </div>
            ) : (
              <ul className="list-group">
                <li className="list-group-item p-4">
                  <p className="text-center m-0">
                    Je hebt nog geen voertuigen toegevoegd
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

export default Vehicles;
