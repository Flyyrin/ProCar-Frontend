import Helmet from "react-helmet";
import Header from "../components/Header";

function Account() {
  return (
    <>
      <Helmet>
        <title>Mijn Account - ProCar</title>
      </Helmet>
      <Header notificationStatus={{ messages: true }} />
      <p>Account</p>
    </>
  );
}

export default Account;
