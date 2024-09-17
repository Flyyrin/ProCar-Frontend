import Helmet from "react-helmet";
import "../styles/Login.css";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Signup() {
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

  const [nameValue, setNameValue] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const maxNameLength = 20;
  const nameValidationRegex =
    /^(?!.*  )(?!.*[^a-zA-Z0-9\-_&. ])[a-zA-Z0-9\-_&. ]{1,20}$/;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameValue(value);
    setNameInvalid(!nameValidationRegex.test(value));
  };

  const [emailValue, setEmailValue] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const emailValidationRegex =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmailValue(value);
    setEmailInvalid(!emailValidationRegex.test(value));
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

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const tempNameInvalid = !nameValidationRegex.test(nameValue);
    setNameInvalid(tempNameInvalid);

    const tempEmailInvalid = !emailValidationRegex.test(emailValue);
    setEmailInvalid(tempEmailInvalid);

    const tempPasswordInvalid = !passwordValidationRegex.test(passwordValue);
    setPasswordInvalid(tempPasswordInvalid);

    const tempPasswordConfirmInvalid = passwordConfirmValue != passwordValue;
    setPasswordConfirmInvalid(tempPasswordConfirmInvalid);

    if (
      tempNameInvalid ||
      tempEmailInvalid ||
      tempPasswordInvalid ||
      tempPasswordConfirmInvalid
    ) {
      event.preventDefault();
    }
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
          <a href="/login" className="link-footer">
            Log dan nu in
          </a>
        </p>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-10">
            <div className="card">
              <div className="card-header bg-white px-0 pb-0 pt-3">
                <ul className="nav nav-tabs justify-content-center border-bottom-0">
                  <li className="nav-item">
                    <a
                      className="nav-link text-secondary"
                      aria-current="page"
                      href="/login"
                    >
                      Inloggen
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active text-dark" href="/signup">
                      Account aanmaken
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <form onSubmit={handleFormSubmit} noValidate autoComplete="off">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Je naam
                    </label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      spellCheck="false"
                      className={`form-control ${nameInvalid && "is-invalid"}`}
                      id="name"
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
                      name="hfhffh"
                      autoComplete="off"
                      className={`form-control ${emailInvalid && "is-invalid"}`}
                      id="email"
                      onChange={handleEmailChange}
                    />
                    <div
                      className={`invalid-feedback ${
                        emailInvalid && "d-block"
                      }`}
                    >
                      <i className="bi bi-exclamation-triangle"></i> Geen geldig
                      e-mailadres ingevuld.
                    </div>
                  </div>
                  <div className="mb-4">
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
                        name="new-password"
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
                        <span className="align-middle d-none d-md-flex">
                          Minimaal 8 tekens
                        </span>
                      </div>
                      <div className="d-flex align-items-center mt-1">
                        <i
                          className={`bi ${
                            passwordDigithValidationRegex.test(passwordValue)
                              ? "bi-check-circle-fill text-success"
                              : "bi-check-circle"
                          } h5 mb-0 me-1`}
                        ></i>
                        <span className="align-middle d-none d-md-flex">
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
                        <span className="align-middle d-none d-md-flex">
                          Ten minste één hoofdletter
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password-confirm" className="form-label">
                      Herhaal wachtwoord
                    </label>
                    <div className="input-group">
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
                    <a className="btn w-100 me-1 btn-outline" href="/login">
                      Annuleren
                    </a>
                    <button type="submit" className="btn w-100 ms-1">
                      Maak account aan
                    </button>
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
