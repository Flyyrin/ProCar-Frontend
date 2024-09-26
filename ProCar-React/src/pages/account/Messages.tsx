import Helmet from "react-helmet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Messages() {
  return (
    <>
      <Helmet>
        <title>Berichten - ProCar</title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />
      <p>Berichten</p>
      <Footer />
    </>
  );
}

export default Messages;
