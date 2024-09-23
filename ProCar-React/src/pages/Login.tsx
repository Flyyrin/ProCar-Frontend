import Helmet from "react-helmet";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Alert from "../components/Alert";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const accountCreated = location.state?.account_created;

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
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    navigate("/login", { replace: true });
    event.preventDefault();
    setApiError(false);
    setInvalidLogin(false);
    axios
      .post("https://localhost:7022/login", formData)
      .then(function (response) {
        if (response.status === 200) {
          Cookies.set("accessToken", response.data.accessToken);
          Cookies.set("refreshToken", response.data.refreshToken);
          navigate("/", {});
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setInvalidLogin(true);
        } else {
          setApiError(true);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Inloggen - ProCar</title>
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
            <div className="card">
              <div className="card-header bg-white px-0 pb-0 pt-3">
                <ul className="nav nav-tabs justify-content-center border-bottom-0">
                  <li className="nav-item">
                    <a
                      className="nav-link active text-dark"
                      aria-current="page"
                      href="/login"
                    >
                      Inloggen
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-secondary" href="/signup">
                      Account aanmaken
                    </a>
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
                    <a href="/reset-password" className="link ms-auto">
                      Wachtwoord vergeten?
                    </a>
                  </div>
                  <button type="submit" className="btn w-100">
                    Inloggen
                  </button>
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
