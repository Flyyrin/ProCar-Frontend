import Helmet from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import axiosInstance from "../components/AxiosInstance";
import { useState } from "react";
import "../styles/ImageBox.css";

function Sell() {
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
        <title>Voertuig verkopen - ProCar</title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />
      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">
          Voertuig verkopen
        </h3>
        <div className="row d-flex justify-content-center">
          <div className="col col-lg-10">
            {apiError && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: "Er is iets mis gegaan, probeer het later nog eens.",
                }}
              />
            )}
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleFormSubmit} noValidate>
                  <h4 className="fw-bold mb-0">Foto's</h4>
                  <p>
                    <small>
                      Vermeld zoveel mogelijk nauwkeurige productgegevens
                      wanneer je de advertentie maakt, om de kwaliteit te
                      verbeteren en je kans op succes te vergroten.
                    </small>
                  </p>
                  <div className="row">
                    <div className="col col-md-8">
                      <div className="imageBox">
                        <div className="mainContainer">
                          <div className="InnerContainer">
                            <input name="image1" type="file" hidden />
                            <div className="uploadBox main"></div>
                          </div>
                        </div>
                        <div className="secondContainer">
                          <div className="secondContainerRow">
                            <div className="secondInnerContainer">
                              <div className="InnerContainer">
                                <input name="image2" type="file" hidden />
                                <div className="uploadBox"></div>
                              </div>
                            </div>
                            <div className="secondInnerContainer">
                              <div className="InnerContainer">
                                <input name="image3" type="file" hidden />
                                <div className="uploadBox"></div>
                              </div>
                            </div>
                          </div>
                          <div className="secondContainerRow">
                            <div className="secondInnerContainer">
                              <div className="InnerContainer">
                                <input name="image4" type="file" hidden />
                                <div className="uploadBox"></div>
                              </div>
                            </div>
                            <div className="secondInnerContainer">
                              <div className="InnerContainer">
                                <input name="image5" type="file" hidden />
                                <div className="uploadBox"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default Sell;
