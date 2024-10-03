import Helmet from "react-helmet";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VehicleItem from "../../components/VehicleItem";

interface Vehicle {
  id: string;
  type: string;
  brand: string;
  commercialName: string;
  licensePlate: string;
}

function Vehicles() {
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  useEffect(() => {
    setVehicleData([
      {
        id: "2442HgV3",
        type: "Bromfiets",
        brand: "Pegeot",
        commercialName: "Speedfight",
        licensePlate: "FS104BD",
      },
      {
        id: "2442dHgV3",
        type: "Bromfiets",
        brand: "Pegeot",
        commercialName: "Speedfight 5",
        licensePlate: "SAMB32",
      },
    ]);
  }, []);

  return (
    <>
      <Helmet>
        <title>Mijn voertuigen - ProCar</title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />
      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">
          Mijn voertuigen
        </h3>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-9">
            {vehicleData.length > 0 ? (
              <div className="accordion">
                {vehicleData.map((vehicle) => (
                  <VehicleItem vehicleItemData={vehicle} />
                ))}
              </div>
            ) : (
              <ul className="list-group">
                <li className="list-group-item p-4">
                  <p className="text-center m-0">
                    Je hebt nog geen voertuigen toegevoegd
                  </p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Vehicles;
