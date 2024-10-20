import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col border border-4">-</div>
          <div className="col-4">
            <h4 className="fw-bold mb-0">
              Audi RS6 Avant 4.0 TFSI Quattro Perfomance / B&O / NL Auto /
            </h4>
            <h5>€72.950,-</h5>
            <p>
              <small className="text-muted">Geplaatst 3 dagen geleden</small>
            </p>
            <div className="d-flex">
              <div className="d-flex align-items-center btn btn-outline w-100">
                <i className="bi bi-chat h5 mb-0"></i>
                <span className="align-middle ms-2">Stuur bericht</span>
              </div>
              <div className="d-flex align-items-center btn btn-outline w-100 mx-2">
                <i className="bi bi-star h5 mb-0"></i>
                <span className="align-middle ms-2">Opslaan</span>
              </div>
              <div className="d-flex align-items-center btn btn-outline w-100">
                <i className="bi bi-share h5 mb-0"></i>
                <span className="align-middle ms-2">Delen</span>
              </div>
            </div>
            <div className="w-100 border border-2 mt-2 mb-3"></div>
            <h5>Beschrijving</h5>
            <div className="mb-3">
              Assistentiepakket inclusief pre sense plus (PCN). Audi RS6 Avant
              4.0 TFSI Quattro Perfomance (605PK) Origineel Nederlands geleverde
              auto met NAP gecontroleerde kilometerstand Uniek ...{" "}
              <span className="fw-bolder highlight click">Zie meer</span>
            </div>
            <h6>Locatie: Nijmegen</h6>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
