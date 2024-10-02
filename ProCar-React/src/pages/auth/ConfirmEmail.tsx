import Helmet from "react-helmet";
import axiosInstance from "../../components/AxiosInstance";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function ConfirmEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const query = `?userId=${queryParameters.get(
      "userId"
    )}&code=${queryParameters.get("code")}`;
    axiosInstance
      .get(`/confirmEmail${query}`)
      .then(function (response) {
        if (response.status === 200) {
          navigate("/login", {
            state: { email_confirmed: true },
          });
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status) {
          if (error.response.status === 401) {
            navigate("/login", {
              state: { email_confirm_error: true },
            });
          } else {
            navigate("/login", {
              state: { api_error: true },
            });
          }
        } else {
          navigate("/login", {
            state: { api_error: true },
          });
        }
      });
  });

  return (
    <>
      <Helmet>
        <title>Verifieer je e-mailadres - ProCar</title>
      </Helmet>
      <Header />

      <div className="container my-5">
        <h3 className="fw-bold text-center py-5">
          Een moment geduld alstublieft...
        </h3>
      </div>
      <Footer />
    </>
  );
}

export default ConfirmEmail;
