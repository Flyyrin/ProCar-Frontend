import Helmet from "react-helmet";
import Header from "../components/Header";

function Messages() {
  return (
    <>
      <Helmet>
        <title>Berichten - ProCar</title>
      </Helmet>
      <Header />
      <p>Berichten</p>
    </>
  );
}

export default Messages;
