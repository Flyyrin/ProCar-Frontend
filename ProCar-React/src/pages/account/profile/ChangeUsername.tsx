import Helmet from "react-helmet";
import axiosInstance from "../../../components/AxiosInstance";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Alert from "../../../components/Alert";

function ChangeUsername() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newUsername: "",
  });

  const [nameValue, setNameValue] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const maxNameLength = 20;
  const nameValidationRegex =
    /^(?!.*  )(?!.*[^a-zA-Z0-9\-_&. ])[a-zA-Z0-9\-_&. ]{1,20}$/;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameValue(value);
    setNameInvalid(!nameValidationRegex.test(value));
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
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const tempNameInvalid = !nameValidationRegex.test(nameValue);
    setNameInvalid(tempNameInvalid);

    event.preventDefault();
    setApiError(false);
    if (!tempNameInvalid) {
      setLoadingSubmit(true);
      axiosInstance
        .patch("/user/name", formData)
        .then(function (response) {
          if (response.status === 200) {
            navigate("/account/my_profile", {
              state: { changed_username: true },
            });
          }
        })
        .catch(function () {
          setApiError(true);
          setLoadingSubmit(false);
          window.scrollTo(0, 0);
        });
    }
  };

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/user/profileInfo`)
      .then(function (response) {
        if (response.status === 200) {
          setNameValue(response.data.username);
          setUsername(response.data.username);
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

  return (
    <>
      <Helmet>
        <title>Gebruikersnaam veranderen - ProCar</title>
      </Helmet>
      <Header />

      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">
          Gebruikersnaam veranderen
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
            {loading && (
              <ul className="list-group">
                <li className="list-group-item p-4 d-flex justify-content-center align-items-center highlight">
                  <div className="spinner-border" role="status" />
                </li>
              </ul>
            )}
            {username && (
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleFormSubmit} noValidate>
                    <div className="mb-3">
                      <h4 className="fw-bold">Voer je nieuwe naam in</h4>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Je naam
                      </label>
                      <input
                        type="text"
                        name="newUsername"
                        autoComplete="off"
                        className={`form-control ${
                          nameInvalid && "is-invalid"
                        } `}
                        id="email"
                        onChange={handleNameChange}
                        disabled={loadingSubmit}
                        value={nameValue}
                      />
                      <div
                        id="nameHelp"
                        className={`form-text ${
                          maxNameLength - nameValue.length < 0 && "text-danger"
                        }`}
                      >
                        {maxNameLength - nameValue.length < 0
                          ? `${-(
                              maxNameLength - nameValue.length
                            )} tekens teveel`
                          : `${maxNameLength - nameValue.length} tekens over.`}
                      </div>
                      <div
                        className={`invalid-feedback ${
                          nameInvalid && "d-block"
                        }`}
                      >
                        <i className="bi bi-exclamation-triangle"></i> Geen
                        geldige naam ingevuld.
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <NavLink
                        className="btn w-100 me-1 btn-outline"
                        to="/account/my_profile"
                      >
                        Annuleren
                      </NavLink>
                      <div className="position-relative w-100">
                        <button
                          type="submit"
                          className={`btn w-100 ms-1 ${
                            loadingSubmit && "disabled"
                          }`}
                          disabled={username == nameValue}
                        >
                          <span className={`${loadingSubmit && "invisible"}`}>
                            Opslaan
                          </span>
                        </button>
                        {loadingSubmit && (
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
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ChangeUsername;
