import { NavLink } from "react-router-dom";
import procarLogo from "/procar.png";
import indicator from "../assets/indicator.svg";
import "../styles/Header.css";

interface HeaderStatus {
  signedIn?: boolean;
  name?: string;
  messages?: boolean;
  notifications?: boolean;
}

function Header({ headerStatus = {} }: { headerStatus?: HeaderStatus }) {
  return (
    <header>
      <nav className="navbar navbar-expand navbar-light bg-white py-0 border-bottom border-2">
        <div className="container-md navbar-container mx-auto">
          <a className="navbar-brand" href="/">
            <img
              src={procarLogo}
              alt=""
              height={30}
              className="d-inline-block align-middle me-1"
            />
            <span className="navbar-brand mb-0 h1">ProCar</span>
          </a>
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
                      {headerStatus.messages && (
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
                      {headerStatus.notifications && (
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

              {headerStatus.signedIn ? (
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
                        {headerStatus.name}
                      </span>
                      <i className="bi bi-chevron-down mb-0"></i>
                    </div>
                  </NavLink>
                  <div
                    className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start px-2"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-item mb-1" href="/account/vehicles">
                      Mijn voertuigen
                    </a>
                    <a className="dropdown-item mb-1" href="/account/ads">
                      Mijn advertenties
                    </a>
                    <a className="dropdown-item mb-1" href="/account/favorites">
                      Mijn favorieten
                    </a>
                    <a className="dropdown-item mb-1" href="/account/profile">
                      Mijn profiel
                    </a>
                    <a className="dropdown-item mb-1" href="/logout">
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
                <a className="nav-link my-0 py-0" href="/sell">
                  <div className="d-flex align-items-center btn btn-sm text-white mb-xs-2">
                    <i className="bi bi-car-front h5 mb-0"></i>
                    <span className="align-middle ms-2 d-none d-lg-flex">
                      Verkoop een auto
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
