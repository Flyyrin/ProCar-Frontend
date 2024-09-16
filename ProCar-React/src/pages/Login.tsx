import Helmet from "react-helmet";
import "../styles/Login.css";
import { useState } from "react";
import Header from "../components/Header";

function Login() {
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

  return (
    <>
      <Helmet>
        <title>Inloggen - ProCar</title>
      </Helmet>
      <Header />

      <div className="container mt-5">
        <h3 className="fw-bold my-5 text-center">Inloggen</h3>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
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
                <form>
                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                      E-mailadres
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="passwordInput" className="form-label">
                      Wachtwoord
                    </label>
                    <div className="input-group">
                      <input
                        type={type}
                        className="form-control border-0"
                        id="passwordInput"
                      />
                      <span
                        className="input-group-text bg-white password-toggler border-0"
                        onClick={handleToggle}
                      >
                        {label}
                      </span>
                    </div>
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
    </>
  );
}

export default Login;
