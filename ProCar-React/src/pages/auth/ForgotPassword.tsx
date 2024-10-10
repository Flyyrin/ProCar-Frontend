import Helmet from "react-helmet";
import axiosInstance from "../../components/AxiosInstance";
import "../../styles/Login.css";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Alert from "../../components/Alert";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [emailValue, setEmailValue] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const emailValidationRegex =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmailValue(value);
    setEmailInvalid(!emailValidationRegex.test(value));
    handleFormChange(event);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const tempEmailInvalid = !emailValidationRegex.test(emailValue);
    setEmailInvalid(tempEmailInvalid);

    event.preventDefault();
    setApiError(false);
    if (!tempEmailInvalid) {
      setLoading(true);
      axiosInstance
        .post("/forgotPassword", formData)
        .then(function (response) {
          if (response.status === 200) {
            setSuccess(true);
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
  };

  return (
    <>
      <Helmet>
        <title>Wachtwoord Vergeten? - ProCar</title>
      </Helmet>
      <Header />

      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">
          Wachtwoord vergeten?
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
                  message: "E-mail met succes verstuurd.",
                }}
              />
            )}
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleFormSubmit} noValidate>
                  <div className="mb-3">
                    <h4 className="fw-bold">
                      Voer je e-mailadres in om je wachtwoord opnieuw in te
                      stellen
                    </h4>
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
                        emailInvalid && "is-invalid"
                      } `}
                      id="email"
                      onChange={handleEmailChange}
                      disabled={success || loading}
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
                    <small>
                      Wij sturen een link naar het door jou ingevulde
                      e-mailadres. Gebruik deze link om vervolgens een nieuw
                      wachtwoord in te stellen.
                    </small>
                  </div>
                  <div className="position-relative">
                    <button
                      type="submit"
                      className={`btn w-100 ${
                        (loading || success) && "disabled"
                      }`}
                    >
                      <span className={`${loading && "invisible"}`}>
                        Versturen
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

export default ForgotPassword;
