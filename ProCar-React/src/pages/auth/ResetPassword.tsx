import Helmet from "react-helmet";
import axios from "axios";
import "../../styles/Login.css";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Alert from "../../components/Alert";

function ResetPassword() {
  const queryParameters = new URLSearchParams(window.location.search);
  const [formData, setFormData] = useState({
    email: `${queryParameters.get("email")}`,
    resetCode: `${queryParameters.get("resetCode")}`,
    newPassword: "",
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

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [apiError, setApiError] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const tempPasswordInvalid = !passwordValidationRegex.test(passwordValue);
    setPasswordInvalid(tempPasswordInvalid);

    const tempPasswordConfirmInvalid = passwordConfirmValue != passwordValue;
    setPasswordConfirmInvalid(tempPasswordConfirmInvalid);

    event.preventDefault();
    setApiError(false);
    if (!tempPasswordInvalid && !tempPasswordConfirmInvalid) {
      setLoading(true);
      axios
        .post("https://localhost:7022/resetPassword", formData)
        .then(function (response) {
          if (response.status === 200) {
            setSuccess(true);
            setApiError(false);
            setLoading(false);
            setInvalidCode(false);
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status) {
            if (error.response.status === 400) {
              setInvalidCode(true);
            } else {
              setApiError(true);
              setInvalidCode(false);
            }
          } else {
            setInvalidCode(false);
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
        <title>Wijzig Wachtwoord - ProCar</title>
      </Helmet>
      <Header />

      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">
          Wachtwoord opnieuw in stellen
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
            {invalidCode && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: `Het wachtwoord kon niet gewijzigd worden.
                  `,
                }}
              />
            )}
            {success && (
              <Alert
                alertStatus={{
                  type: "success",
                  message: "Wachtwoord met succes gewijzigd.",
                }}
              />
            )}
            <div className="card">
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
                      value={`${queryParameters.get("email")}`}
                      disabled={true}
                    />
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
                        name="newPassword"
                        autoComplete="new-password"
                        aria-autocomplete="list"
                        minLength={8}
                        maxLength={64}
                        className="form-control border-0"
                        id="new-password"
                        aria-describedby="passwordHelp"
                        onChange={handlePasswordChange}
                        disabled={success || invalidCode}
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
                        disabled={success || invalidCode}
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
                  <div className="position-relative">
                    <button
                      type="submit"
                      className={`btn w-100 ${
                        (loading || success || invalidCode) && "disabled"
                      }`}
                    >
                      <span className={`${loading && "invisible"}`}>
                        Bevestigen
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

export default ResetPassword;
