import Helmet from "react-helmet";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Alert from "../../components/Alert";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const accountCreated = location.state?.account_created;
  const redirectApiError = location.state?.api_error;
  const emailConfirmError = location.state?.email_confirm_error;
  const emailConfirmed = location.state?.email_confirmed;
  var redirect = new URLSearchParams(window.location.search).get("to");

  useEffect(() => {
    setApiError(redirectApiError);
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      setLoading(true);
      axios
        .post("https://localhost:7022/refresh", {
          refreshToken: refreshToken,
        })
        .then(function (response) {
          if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            window.location.href = redirect ? `/${redirect}` : "/";
          }
        })
        .catch(function () {
          localStorage.removeItem("refreshToken");
          setLoading(false);
        });
    }
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [type, setType] = useState("password");
  const [label, setLabel] = useState("Toon");

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
      setLabel("Verberg");
    } else {
      setType("password");
      setLabel("Toon");
    }
  };

  const [rememberMe, setRememberMe] = useState(false);
  const handleCheckbox = () => {
    setRememberMe(!rememberMe);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [invalidLogin, setInvalidLogin] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmEmailError, setConfirmEmailError] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    navigate("/login", { replace: true });
    setLoading(true);
    event.preventDefault();
    setApiError(false);
    setInvalidLogin(false);
    setConfirmEmailError(false);
    axios
      .post("https://localhost:7022/login", formData)
      .then(function (response) {
        if (response.status === 200) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          axios
            .post("https://localhost:7022/IsEmailVerified", {
              email: formData.email,
            })
            .then(function () {
              localStorage.setItem("accessToken", response.data.accessToken);
              rememberMe &&
                localStorage.setItem(
                  "refreshToken",
                  response.data.refreshToken
                );
              window.location.href = redirect ? `/${redirect}` : "/";
            })
            .catch(function (error) {
              if (error.response.status === 400) {
                setConfirmEmailError(true);
                setLoading(false);
              } else {
                setApiError(true);
              }
            });
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status) {
          if (error.response.status === 401) {
            setInvalidLogin(true);
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

  return (
    <>
      <Helmet>
        <title>Inloggen - ProCar</title>
        <meta name="pre-authorize"></meta>
      </Helmet>
      <Header />

      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">Inloggen</h3>
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
            {invalidLogin && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: "Het e-mailadres of wachtwoord is ongeldig.",
                }}
              />
            )}
            {accountCreated && (
              <Alert
                alertStatus={{
                  type: "success",
                  message: "Account met succes aangemaakt.",
                }}
              />
            )}
            {emailConfirmed && (
              <Alert
                alertStatus={{
                  type: "success",
                  message: "E-mail met succes geverifieerd.",
                }}
              />
            )}
            {emailConfirmError && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: "Het e-mailadres kon niet geverifieerd worden.",
                }}
              />
            )}

            {confirmEmailError && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: "Het e-mailadres is nog niet geverifieerd.",
                }}
              />
            )}
            <div className="card">
              <div className="card-header bg-white px-0 pb-0 pt-3">
                <ul className="nav nav-tabs justify-content-center border-bottom-0">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active text-dark"
                      aria-current="page"
                      to="/login"
                    >
                      Inloggen
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-secondary"
                      to={`/signup${location.search}`}
                    >
                      Account aanmaken
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <form onSubmit={handleFormSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                      E-mailadres
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="emailInput"
                      onChange={handleFormChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                      Wachtwoord
                    </label>
                    <div className="input-group">
                      <input
                        type={type}
                        name="password"
                        className="form-control border-0"
                        id="passwordInput"
                        onChange={handleFormChange}
                        disabled={loading}
                      />
                      <span
                        className="input-group-text bg-white password-toggler border-0"
                        onClick={handleToggle}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-center mb-4"
                    onClick={handleCheckbox}
                  >
                    <i
                      className={`bi ${
                        rememberMe
                          ? "bi-check-square-fill"
                          : "bi-square text-dark"
                      } me-2 h5 mb-0 checkbox`}
                    ></i>
                    <span className="align-middle">Ingelogd blijven</span>
                    <NavLink to="/forgot_password" className="link ms-auto">
                      Wachtwoord vergeten?
                    </NavLink>
                  </div>
                  <div className="position-relative">
                    <button
                      type="submit"
                      className={`btn w-100 ${loading && "disabled"}`}
                    >
                      <span className={`${loading && "invisible"}`}>
                        Inloggen
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

export default Login;
