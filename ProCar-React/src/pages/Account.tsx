import Helmet from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Account() {
  return (
    <>
      <Helmet>
        <title>Mijn Account - ProCar</title>
      </Helmet>
      <Header />
      <p>Account</p>
      <Footer />
    </>
  );
}

export default Account;
