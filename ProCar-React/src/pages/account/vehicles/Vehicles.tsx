import Helmet from "react-helmet";
import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../components/AxiosInstance";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import VehicleItem from "../../../components/VehicleItem";
import Alert from "../../../components/Alert";
import carIcon from "../../../assets/vehicle/types/car.svg";
import motorcycleIcon from "../../../assets/vehicle/types/motorcycle.svg";

function getIconPath(type: string): string {
  if (type == "Bromfiets" || type == "Motorfiets") {
    return motorcycleIcon;
  }
  return carIcon;
}

const capitalizeFirstLetter = (str: string) =>
  str?.charAt(0).toUpperCase() + str?.slice(1);

function Vehicles() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState<any[]>([]);

  const [vehicleAdded] = useState(location.state?.vehicle_added);
  const [vehicleDeleted, setVehicleDeleted] = useState(
    location.state?.vehicle_deleted
  );
  const [deleteVehicleId, setVehiclePrepDeleted] = useState(
    location.state?.vehicle_prep_deleted
  );
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [apiError, setApiError] = useState(location.state?.api_error);
  useEffect(() => {
    setVehicleDeleted(location.state?.vehicle_deleted);
    setVehiclePrepDeleted(location.state?.vehicle_prep_deleted);
    setApiError(location.state?.api_error);
    location.state?.vehicle_deleted && loadVehicles();
    location.state?.vehicle_prep_deleted && setShowRemoveModal(true);
  }, [location.state]);

  useEffect(() => {
    navigate(location.pathname, { replace: true, state: {} });
  }, [navigate, location.pathname]);

  useEffect(() => {
    loadVehicles();
  }, []);

  function loadVehicles() {
    setLoading(true);
    axiosInstance
      .get(`/user/vehicles`)
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
  }

  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDeleteVehicle = () => {
    setDeleteLoading(true);
    setApiError(false);
    axiosInstance
      .delete(`/vehicle/${deleteVehicleId}`)
      .then(function (response) {
        if (response.status === 200) {
          setDeleteLoading(false);
          setShowRemoveModal(false);
          navigate(location.pathname, {
            state: { vehicle_deleted: true },
            replace: true,
          });
          window.scrollTo(0, 0);
        }
      })
      .catch(function () {
        setApiError(true);
        setDeleteLoading(false);
        setShowRemoveModal(false);
        window.scrollTo(0, 0);
      });
  };

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
                  <VehicleItem vehicleData={vehicle} key={vehicle.id} />
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

        {showRemoveModal && deleteVehicleId && (
          <>
            <div
              className="modal show d-block"
              id="removeModal"
              aria-labelledby="removeModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header border-0">
                    <h5 className="modal-title" id="removeModalLabel">
                      Voertuig verwijderen
                    </h5>
                  </div>
                  <div className="modal-body d-flex align-items-center justify-content-center py-1">
                    <div className="notification-image-container me-3 flex-shrink-0">
                      <img
                        src={getIconPath(
                          vehicleData.find(
                            (vehicle) => vehicle.id === deleteVehicleId
                          )?.voertuigsoort
                        )}
                        className="w-100"
                        alt="Image"
                      ></img>
                    </div>
                    <div>
                      <p className="mb-0">
                        <strong className="highlight">
                          {capitalizeFirstLetter(
                            vehicleData.find(
                              (vehicle) => vehicle.id === deleteVehicleId
                            )?.merk
                          )}{" "}
                          {
                            vehicleData.find(
                              (vehicle) => vehicle.id === deleteVehicleId
                            )?.handelsbenaming
                          }
                        </strong>
                      </p>
                      <p className="mb-0 fs-6">
                        {capitalizeFirstLetter(
                          vehicleData.find(
                            (vehicle) => vehicle.id === deleteVehicleId
                          )?.kenteken
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="modal-footer border-0">
                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn w-100 me-1 btn-outline"
                        type="button"
                        onClick={() => {
                          setShowRemoveModal(false);
                        }}
                      >
                        Annuleren
                      </button>
                      <div className="position-relative ms-1 w-100">
                        <button
                          type="submit"
                          className={`btn w-100 ${deleteLoading && "disabled"}`}
                          onClick={handleDeleteVehicle}
                        >
                          <span className={`${deleteLoading && "invisible"}`}>
                            Verwijder voertuig
                          </span>
                        </button>
                        {deleteLoading && (
                          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white">
                            <div
                              className="spinner-border spinner-border-sm position-absolute"
                              role="status"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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

export default Vehicles;
