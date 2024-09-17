import Helmet from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Notifications() {
  return (
    <>
      <Helmet>
        <title>Meldingen - ProCar</title>
      </Helmet>
      <Header />
      <p>Meldingen</p>
      <Footer />
    </>
  );
}

export default Notifications;
