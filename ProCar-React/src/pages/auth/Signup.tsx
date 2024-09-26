import Helmet from "react-helmet";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../../styles/Login.css";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Alert from "../../components/Alert";

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [type, setType] = useState("password");
  const [label, setLabel] = useState("Toon");

  const [type2, setType2] = useState("password");
  const [label2, setLabel2] = useState("Toon");

  const handlePasswordToggle = () => {
    if (type === "password") {
      setType("text");
      setLabel("Verberg");
    } else {
      setType("password");
      setLabel("Toon");
    }
  };

  const handlePasswordToggle2 = () => {
    if (type2 === "password") {
      setType2("text");
      setLabel2("Verberg");
    } else {
      setType2("password");
      setLabel2("Toon");
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [nameValue, setNameValue] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const maxNameLength = 20;
  const nameValidationRegex =
    /^(?!.*  )(?!.*[^a-zA-Z0-9\-_&. ])[a-zA-Z0-9\-_&. ]{1,20}$/;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameValue(value);
    setNameInvalid(!nameValidationRegex.test(value));
    setFormData({
      ...formData,
      username: value,
    });
  };

  const [emailValue, setEmailValue] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const emailValidationRegex =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailTaken(false);
    const value = event.target.value;
    setEmailValue(value);
    setEmailInvalid(!emailValidationRegex.test(value));
    handleFormChange(event);
  };

  const [passwordValue, setPasswordValue] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const passwordValidationRegex = /^(?=.*[A-Z])(?=.*\d)[^\s]{8,64}$/;
  const passwordLengthValidationRegex = /^.{8,}$/;
  const passwordDigithValidationRegex = /^(?=.*\d).+$/;
  const passwordUppercaseValidationRegex = /^(?=.*[A-Z]).+$/;

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPasswordValue(value);
    setPasswordInvalid(!passwordValidationRegex.test(value));

    setPasswordConfirmInvalid(passwordConfirmValue != value);
    handleFormChange(event);
  };

  const [passwordConfirmValue, setPasswordConfirmValue] = useState("");
  const [passwordConfirmInvalid, setPasswordConfirmInvalid] = useState(false);
  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPasswordConfirmValue(value);
    setPasswordConfirmInvalid(value != passwordValue);
  };

  const [emailTaken, setEmailTaken] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const tempNameInvalid = !nameValidationRegex.test(nameValue);
    setNameInvalid(tempNameInvalid);

    const tempEmailInvalid = !emailValidationRegex.test(emailValue);
    setEmailInvalid(tempEmailInvalid);

    const tempPasswordInvalid = !passwordValidationRegex.test(passwordValue);
    setPasswordInvalid(tempPasswordInvalid);

    const tempPasswordConfirmInvalid = passwordConfirmValue != passwordValue;
    setPasswordConfirmInvalid(tempPasswordConfirmInvalid);

    event.preventDefault();
    setApiError(false);
    if (
      !tempNameInvalid &&
      !tempEmailInvalid &&
      !tempPasswordInvalid &&
      !tempPasswordConfirmInvalid
    ) {
      setLoading(true);
      axios
        .post("https://localhost:7022/register", formData)
        .then(async function (response) {
          if (response.status === 200) {
            await updateUserName();
            navigate("/login", {
              state: { account_created: true },
            });
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status) {
            if (error.response.status === 400) {
              setEmailTaken(true);
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

  const updateUserName = () => {
    axios
      .post("https://localhost:7022/RegisterUserName", formData)
      .then(async function () {
        return;
      });
  };

  return (
    <>
      <Helmet>
        <title>Account Aanmaken - ProCar</title>
      </Helmet>
      <Header />
      <div className="container mt-4">
        <h3 className="fw-bold mt-4 mb-3 text-md-center ps-2 ps-md-0">
          Account aanmaken
        </h3>
        <p className="text-md-center ps-2 ps-md-0 mb-3">
          Heb je al een account?{" "}
          <NavLink to="/login" className="link">
            Log dan nu in
          </NavLink>
        </p>
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
            <div className="card">
              <div className="card-header bg-white px-0 pb-0 pt-3">
                <ul className="nav nav-tabs justify-content-center border-bottom-0">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-secondary"
                      aria-current="page"
                      to="/login"
                    >
                      Inloggen
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link active text-dark" to="/signup">
                      Account aanmaken
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <form onSubmit={handleFormSubmit} noValidate autoComplete="off">
                  <div className="mb-3">
                    <label htmlFor="procarID" className="form-label">
                      Je naam
                    </label>
                    <input
                      type="text"
                      name="procarID"
                      autoComplete="off"
                      spellCheck="false"
                      className={`form-control ${nameInvalid && "is-invalid"}`}
                      id="procarID"
                      aria-describedby="nameHelp"
                      onChange={handleNameChange}
                    />
                    <div
                      id="nameHelp"
                      className={`form-text ${
                        maxNameLength - nameValue.length < 0 && "text-danger"
                      }`}
                    >
                      {maxNameLength - nameValue.length < 0
                        ? `${-(maxNameLength - nameValue.length)} tekens teveel`
                        : `${maxNameLength - nameValue.length} tekens over.`}
                    </div>
                    <div
                      className={`invalid-feedback ${nameInvalid && "d-block"}`}
                    >
                      <i className="bi bi-exclamation-triangle"></i> Geen
                      geldige naam ingevuld.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-mailadres
                    </label>
                    <input
                      type="text"
                      name="email"
                      autoComplete="off"
                      className={`form-control ${
                        emailInvalid || emailTaken ? "is-invalid" : ""
                      }`}
                      id="email"
                      onChange={handleEmailChange}
                    />
                    <div
                      className={`invalid-feedback ${
                        emailInvalid || emailTaken ? "d-block" : ""
                      }`}
                    >
                      <i className="bi bi-exclamation-triangle"></i>{" "}
                      {emailTaken
                        ? "Dit e-mailadres is al in gebruik."
                        : "Geen geldige-mailadres ingevuld."}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="new-password" className="form-label">
                      Wachtwoord
                    </label>
                    <div
                      className={`input-group ${
                        passwordInvalid && "is-invalid"
                      }`}
                    >
                      <input
                        type={type}
                        name="password"
                        autoComplete="new-password"
                        aria-autocomplete="list"
                        minLength={8}
                        maxLength={64}
                        className="form-control border-0"
                        id="new-password"
                        aria-describedby="passwordHelp"
                        onChange={handlePasswordChange}
                      />
                      <span
                        className="input-group-text bg-white password-toggler border-0"
                        onClick={handlePasswordToggle}
                      >
                        {label}
                      </span>
                    </div>
                    <div
                      className={`invalid-feedback ${
                        passwordInvalid && "d-block"
                      }`}
                    >
                      <i className="bi bi-exclamation-triangle"></i> Geen geldig
                      wachtwoord ingevuld.
                    </div>
                    <div id="passwordHelp" className="form-text">
                      <div className="d-flex align-items-center mt-2">
                        <i
                          className={`bi ${
                            passwordLengthValidationRegex.test(passwordValue)
                              ? "bi-check-circle-fill text-success"
                              : "bi-check-circle"
                          } h5 mb-0 me-1`}
                        ></i>
                        <span className="align-middle">Minimaal 8 tekens</span>
                      </div>
                      <div className="d-flex align-items-center mt-1">
                        <i
                          className={`bi ${
                            passwordDigithValidationRegex.test(passwordValue)
                              ? "bi-check-circle-fill text-success"
                              : "bi-check-circle"
                          } h5 mb-0 me-1`}
                        ></i>
                        <span className="align-middle">
                          Ten minste één cijfer
                        </span>
                      </div>
                      <div className="d-flex align-items-center mt-1">
                        <i
                          className={`bi ${
                            passwordUppercaseValidationRegex.test(passwordValue)
                              ? "bi-check-circle-fill text-success"
                              : "bi-check-circle"
                          } h5 mb-0 me-1`}
                        ></i>
                        <span className="align-middle">
                          Ten minste één hoofdletter
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password-confirm" className="form-label">
                      Herhaal wachtwoord
                    </label>
                    <div
                      className={`input-group ${
                        passwordConfirmInvalid && "is-invalid"
                      }`}
                    >
                      <input
                        type={type2}
                        name="password-confirm"
                        autoComplete="new-password"
                        className="form-control border-0"
                        id="password-confirm"
                        onChange={handlePasswordConfirmChange}
                      />
                      <span
                        className="input-group-text bg-white password-toggler border-0"
                        onClick={handlePasswordToggle2}
                      >
                        {label2}
                      </span>
                    </div>
                    <div
                      className={`invalid-feedback ${
                        passwordConfirmInvalid && "d-block"
                      }`}
                    >
                      <i className="bi bi-exclamation-triangle"></i>
                      Vul tweemaal hetzelfde wachtwoord in.
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <NavLink className="btn w-100 me-1 btn-outline" to="/login">
                      Annuleren
                    </NavLink>
                    <div className="position-relative ms-1 w-100">
                      <button
                        type="submit"
                        className={`btn w-100 ${loading && "disabled"}`}
                      >
                        <span className={`${loading && "invisible"}`}>
                          Maak account aan
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

export default Signup;
