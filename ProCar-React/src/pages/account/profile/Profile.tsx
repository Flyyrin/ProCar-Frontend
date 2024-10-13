import Helmet from "react-helmet";
import axiosInstance from "../../../components/AxiosInstance";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Alert from "../../../components/Alert";

function Profile() {
  const location = useLocation();

  const [changedUsername] = useState(location.state?.changed_username);
  const [changedEmail] = useState(location.state?.changed_email);
  const [changedPassword] = useState(location.state?.changed_password);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [userData, setUserData] = useState<Record<string, any>>({});
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/GetUserProfileInfo`)
      .then(function (response) {
        if (response.status === 200) {
          setUserData(response.data);
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

  const [success, setSuccess] = useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const handlePasswordReset = () => {
    if (!success) {
      setApiError(false);
      setLoadingResetPassword(true);
      axiosInstance
        .post("/forgotPassword", { email: userData.email })
        .then(function (response) {
          if (response.status === 200) {
            setSuccess(true);
            setApiError(false);
            setLoadingResetPassword(false);
          }
        })
        .catch(function () {
          setApiError(true);
          setLoadingResetPassword(false);
          window.scrollTo(0, 0);
        });
    }
  };

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
            {apiError && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: "Er is iets mis gegaan, probeer het later nog eens.",
                }}
              />
            )}
            {success && (
              <Alert
                alertStatus={{
                  type: "success",
                  message:
                    "Controleer uw e-mail om het wachtwoord te veranderen.",
                }}
              />
            )}
            {changedUsername && (
              <Alert
                alertStatus={{
                  type: "success",
                  message: "Naam met succes veranderd.",
                }}
              />
            )}
            {changedEmail && (
              <Alert
                alertStatus={{
                  type: "success",
                  message: "E-mailadres met succes veranderd.",
                }}
              />
            )}
            {changedPassword && (
              <Alert
                alertStatus={{
                  type: "success",
                  message: "Wachtwoord met succes veranderd.",
                }}
              />
            )}
            {loading && (
              <ul className="list-group">
                <li className="list-group-item p-4 d-flex justify-content-center align-items-center highlight">
                  <div className="spinner-border" role="status" />
                </li>
              </ul>
            )}
            {Object.keys(userData).length === 3 && (
              <div className="card">
                <div className="card-body">
                  <div className="row info-row d-flex align-items-center my-2">
                    <div className="col-md-3 col-5">
                      <p className="text-muted mb-0">Gebruikersnaam</p>
                    </div>
                    <div className="col">
                      <p className="mb-0 fw-bold d-flex">
                        {userData?.username}
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
                        {userData?.email}
                        <p className="mb-0 btn-outline border-0 ms-auto">
                          <strong className="disabled-text">Wijzigen</strong>
                        </p>
                      </p>
                    </div>
                  </div>
                  <div className="row info-row d-flex align-items-center my-2">
                    <div className="col-md-3 col-5">
                      <p className="text-muted mb-0">Wachtwoord</p>
                    </div>
                    <div className="col">
                      <p className="mb-0 fw-bold d-flex">
                        {Array.from({ length: 7 }, (_, i) => (
                          <span>•</span>
                        ))}
                        <p
                          className="mb-0 btn-outline border-0 ms-auto click"
                          onClick={handlePasswordReset}
                        >
                          <div className="position-relative">
                            <strong className={`${success && "disabled-text"}`}>
                              <span
                                className={`${
                                  loadingResetPassword && "invisible"
                                }`}
                              >
                                Wijzigen
                              </span>
                            </strong>
                            {loadingResetPassword && (
                              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
                                <div
                                  className="spinner-border spinner-border-sm position-absolute"
                                  role="status"
                                />
                              </div>
                            )}
                          </div>
                        </p>
                      </p>
                    </div>
                  </div>
                  <div className="row info-row d-flex align-items-center my-2">
                    <div className="col-md-3 col-5">
                      <p className="text-muted mb-0">Actief sinds</p>
                    </div>
                    <div className="col">
                      <p className="mb-0 fw-bold d-flex">
                        {userData?.active_since}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
