import Helmet from "react-helmet";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/AxiosInstance";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Alert from "../../components/Alert";
import Notification from "../../components/Notification";

function Notifications() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notificationData, setNotificationData] = useState<any[]>([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  function loadNotifications() {
    setLoading(true);
    axiosInstance
      .get(`/GetUserNotifications`)
      .then(function (response) {
        if (response.status === 200) {
          setNotificationData(response.data);
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

  return (
    <>
      <Helmet>
        <title>Meldingen - ProCar</title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />
      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">Meldingen</h3>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-9">
            {apiError && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: "Er is iets mis gegaan, probeer het later nog eens.",
                }}
              />
            )}
            {loading ? (
              <ul className="list-group">
                <li className="list-group-item p-4 d-flex justify-content-center align-items-center highlight">
                  <div className="spinner-border" role="status" />
                </li>
              </ul>
            ) : notificationData.length > 0 ? (
              <ul className="list-group">
                {notificationData.map((notification) => (
                  <Notification
                    notificationData={notification}
                    key={notification.id}
                  />
                ))}
              </ul>
            ) : (
              <ul className="list-group">
                <li className="list-group-item p-4">
                  <p className="text-center m-0">
                    Je hebt momenteel geen meldingen
                  </p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Notifications;
