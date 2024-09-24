import Helmet from "react-helmet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Notification from "../../components/Notification";

function Notifications() {
  return (
    <>
      <Helmet>
        <title>Meldingen - ProCar</title>
      </Helmet>
      <Header />
      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">Meldingen</h3>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-9">
            <ul className="list-group">
              <Notification
                notificationStatus={{
                  image:
                    "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg",
                  timestamp: "2024-09-17T11:46:00",
                  message:
                    "Je bod van €100 is overboden op de advertentie: McLaren 750S 3500km",
                  button: "Bekijk advertentie",
                  source: "#test",
                }}
              />
              <Notification
                notificationStatus={{
                  image:
                    "https://images.marktplaats.com/api/v1/listing-mp-p/images/02/02f3e47a-8f38-430f-8e3c-67fef229b46c?rule=ecg_mp_eps$_85",
                  timestamp: "2024-09-16T11:46:00",
                  message:
                    "Jan Willem heeft €27000,00 geboden op jouw advertentie: Audi RS6 Avant 4.0 TFSI 605 pk Quattro Performance Akrapovic",
                  button: "Bekijk advertentie",
                  source: "#test",
                }}
              />
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Notifications;
