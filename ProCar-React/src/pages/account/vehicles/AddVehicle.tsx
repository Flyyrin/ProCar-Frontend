import Helmet from "react-helmet";
import axiosInstance from "../../../components/AxiosInstance";
import "../../../styles/Login.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../../styles/Plate.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Alert from "../../../components/Alert";

function AddVehicle() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    LicensePlate: "",
  });

  const [plateInvalid, setPlateInvalid] = useState(false);
  const plateValidationRegex = /^[a-zA-Z0-9]{6}$/;

  const handlePlateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleData([]);
    setPlateSuccess(false);
    setDuplicate(false);
    var value = event.target.value;
    value = value.replace(/-/g, "");
    setPlateInvalid(!plateValidationRegex.test(value));
    handleFormChange(event);

    if (value.length == 6) {
      handlePlateCheck(value);
    }
  };

  const [vehicleData, setVehicleData] = useState<any[]>([]);
  const [plateSuccess, setPlateSuccess] = useState(false);
  const handlePlateCheck = (plate: string) => {
    setLoading(true);
    axiosInstance
      .get(`/checkLicensePlate?licensePlate=${plate}`)
      .then(function (response) {
        if (response.status === 200) {
          setPlateSuccess(true);
          setVehicleData(response.data);
          setApiError(false);
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status) {
          if (error.response.status === 400) {
            setPlateInvalid(true);
          } else {
            setApiError(true);
          }
        } else {
          setApiError(true);
        }
        setLoading(false);
        window.scrollTo(0, 0);
      });
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [limitReached, setLimitReached] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(false);
    if (!plateInvalid && plateSuccess) {
      setLoading(true);
      axiosInstance
        .post("/addVehicle", formData)
        .then(function (response) {
          if (response.status === 200) {
            navigate("/account/my_vehicles", {
              state: { vehicle_added: true },
            });
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status) {
            if (error.response.status === 406) {
              setLimitReached(true);
            } else if (error.response.status === 409) {
              setDuplicate(true);
            } else {
              setApiError(true);
            }
          } else {
            setApiError(true);
          }
          setLoading(false);
          window.scrollTo(0, 0);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Voertuig toevoegen - ProCar</title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />

      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">
          Voertuig toevoegen
        </h3>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-10">
            {apiError && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: "Er is iets mis gegaan, probeer het later nog eens.",
                }}
              />
            )}
            {limitReached && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: "Je hebt het aantal voertuigen limiet bereikt.",
                }}
              />
            )}
            {duplicate && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: "Je hebt dit voertuig al toegevoegd.",
                }}
              />
            )}
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleFormSubmit} noValidate>
                  <div className="mb-3">
                    <h4 className="fw-bold">
                      Voer je kenteken in om je voertuig toe te voegen
                    </h4>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="LicensePlate"
                      autoComplete="off"
                      placeholder="xx-xx-xx"
                      className="form-control plate text-uppercase text-center border-2 mb-2"
                      maxLength={8}
                      size={10}
                      onChange={handlePlateChange}
                      disabled={loading}
                      autoFocus
                    />
                    <div
                      className={`invalid-feedback ${
                        plateInvalid && "d-block"
                      }`}
                    >
                      <i className="bi bi-exclamation-triangle"></i> Geen geldig
                      kenteken ingevuld.
                    </div>
                    {Object.keys(vehicleData).map((key) => (
                      <div className="row info-row">
                        <div className="col-md-3 col-5">
                          <p className="text-muted mb-0 text-capitalize">
                            {key.replace(/_/g, " ")}
                          </p>
                        </div>
                        <div className="col">
                          <p className="mb-0 text-capitalize fw-bold">
                            {(vehicleData as Record<string, any>)[key]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <small>
                      Wij vragen je voertuig gegevens op bij de RDW op basis van
                      het kenteken.
                    </small>
                  </div>
                  <div className="d-flex justify-content-between">
                    <NavLink
                      className="btn w-100 me-1 btn-outline"
                      to="/account/my_vehicles"
                    >
                      Annuleren
                    </NavLink>
                    <div className="position-relative w-100">
                      <button
                        type="submit"
                        className={`btn w-100 ${loading && "disabled"}`}
                      >
                        <span className={`${loading && "invisible"}`}>
                          Toevoegen
                        </span>
                      </button>
                      {loading && (
                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white">
                          <div
                            className="spinner-border spinner-border-sm position-absolute"
                            role="status"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddVehicle;
