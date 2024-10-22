import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";
import procarLogo from "/procar.png";
import indicator from "../assets/indicator.svg";
import "../styles/Header.css";
import Alert from "./Alert";

function Header() {
  const navigate = useNavigate();

  const handleLogoutFix = () => {
    handleLogout();
  };

  const handleLogout = (redirect = "/") => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = redirect;
  };

  const getHeaderStatus = () => {
    axiosInstance
      .get("/GetHeaderStatus", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(async function (response) {
        if (response.status === 200) {
          setApiError(false);
          SetUsername(response.data.name);
          setUnreadMessages(response.data.messages);
          setUnreadNotifications(response.data.notifications);
          setSignedIn(true);
          if (document.querySelector('meta[name="pre-authorize"]')) {
            navigate("/");
          }
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status) {
          if (error.response.status === 401) {
            if (document.querySelector('meta[name="authorize"]')) {
              var refreshToken = localStorage.getItem("refreshToken");
              if (refreshToken) {
                navigate(`/login?to=${window.location.pathname.slice(1)}`);
              } else {
                handleLogout(`/login?to=${window.location.pathname.slice(1)}`);
              }
              setSignedIn(false);
            }
          } else {
            setApiError(true);
          }
        } else {
          setApiError(true);
        }
        window.scrollTo(0, 0);
      });
  };

  const [signedIn, setSignedIn] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [username, SetUsername] = useState("");
  const [unreadMessages, setUnreadMessages] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(false);
  useEffect(() => {
    getHeaderStatus();
    const intervalId = setInterval(() => {
      getHeaderStatus();
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand navbar-light bg-white py-0 border-bottom border-2">
        <div className="container-md navbar-container mx-auto">
          <NavLink className="navbar-brand" to="/">
            <img
              src={procarLogo}
              alt=""
              height={30}
              className="d-inline-block align-middle me-1"
            />
            <span className="navbar-brand mb-0 h1">ProCar</span>
          </NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item my-auto">
                <NavLink
                  className="nav-link my-0 text-dark underline"
                  aria-current="page"
                  to="/messages"
                >
                  <div className="d-flex align-items-center">
                    <i className="bi bi-chat h5 mb-0 me-1 position-relative">
                      {unreadMessages &&
                        window.location.pathname != "/messages" && (
                          <img
                            src={indicator}
                            alt="indicator"
                            className="img-fluid position-absolute indicator text-danger"
                          />
                        )}
                    </i>
                    <span className="align-middle d-none d-md-flex">
                      Berichten
                    </span>
                  </div>
                </NavLink>
              </li>
              <li className="nav-item my-auto">
                <NavLink
                  className="nav-link my-0 text-dark underline"
                  aria-current="page"
                  to="/notifications"
                >
                  <div className="d-flex align-items-center">
                    <i className="bi bi-bell h5 mb-0 me-1 position-relative">
                      {(!signedIn ||
                        (unreadNotifications &&
                          window.location.pathname != "/notifications")) && (
                        <img
                          src={indicator}
                          alt="indicator"
                          className="img-fluid position-absolute indicator text-danger"
                        />
                      )}
                    </i>
                    <span className="align-middle d-none d-md-flex">
                      Meldingen
                    </span>
                  </div>
                </NavLink>
              </li>

              {signedIn ? (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link my-0 text-dark underline"
                    to="/account"
                    id="navbarDropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person h5 mb-0 me-1"></i>
                      <span className="align-middle d-none d-md-flex me-1">
                        {username}
                      </span>
                      <i className="bi bi-chevron-down mb-0"></i>
                    </div>
                  </NavLink>
                  <div
                    className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start px-2"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <NavLink
                      className="dropdown-item mb-1"
                      to="/account/my_vehicles"
                    >
                      Mijn voertuigen
                    </NavLink>
                    <NavLink className="dropdown-item mb-1" to="/account/ads">
                      Mijn advertenties
                    </NavLink>
                    <NavLink
                      className="dropdown-item mb-1"
                      to="/account/favorites"
                    >
                      Mijn favorieten
                    </NavLink>
                    <NavLink
                      className="dropdown-item mb-1"
                      to="/account/my_profile"
                    >
                      Mijn profiel
                    </NavLink>
                    <a className="dropdown-item mb-1" onClick={handleLogoutFix}>
                      Uitloggen
                    </a>
                  </div>
                </li>
              ) : (
                <li className="nav-item my-auto">
                  <NavLink
                    className="nav-link my-0 text-dark underline"
                    aria-current="page"
                    to="/login"
                  >
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person h5 mb-0 me-1"></i>
                      <span className="align-middle d-none d-md-flex">
                        Inloggen
                      </span>
                    </div>
                  </NavLink>
                </li>
              )}
              <li className="nav-item my-auto">
                <NavLink className="nav-link my-0 py-0" to="/sell">
                  <div className="d-flex align-items-center btn btn-sm text-white mb-xs-2">
                    <i className="bi bi-car-front-fill h5 mb-0"></i>
                    <span className="align-middle ms-2 d-none d-lg-flex">
                      Verkoop een auto
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {apiError && (
        <nav className="mx-3 mx-md-5 mt-1">
          <Alert
            alertStatus={{
              type: "danger",
              message: "Er is iets mis gegaan, probeer het later nog eens.",
            }}
          />
        </nav>
      )}
    </header>
  );
}

export default Header;
