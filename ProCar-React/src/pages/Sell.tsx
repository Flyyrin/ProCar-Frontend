import Helmet from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Sell() {
  return (
    <>
      <Helmet>
        <title>Verkopen - ProCar</title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />
      <p>Verkopen</p>
      <Footer />
    </>
  );
}

export default Sell;
