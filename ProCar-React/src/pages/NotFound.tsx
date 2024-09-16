import Helmet from "react-helmet";
import Header from "../components/Header";
import searchImage from "../assets/search.png";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Pagina niet gevonden - ProCar</title>
      </Helmet>
      <Header />
      <div className="container-fluid pt-5 text-center">
        <h3 className="fw-bold my-5">We konden deze pagina niet vinden.</h3>
        <div className="row d-flex justify-content-center">
          <div className="col-md-3 col-sm-6 col-8">
            <img src={searchImage} alt="search" className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
