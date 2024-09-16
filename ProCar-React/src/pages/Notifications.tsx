import Helmet from "react-helmet";
import Header from "../components/Header";

function Notifications() {
  return (
    <>
      <Helmet>
        <title>Meldingen - ProCar</title>
      </Helmet>
      <Header />
      <p>Meldingen</p>
    </>
  );
}

export default Notifications;
