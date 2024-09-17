import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header headerStatus={{ messages: true, notifications: true }} />
      <p>Home</p>
      <Footer />
    </>
  );
}

export default Home;
