import { useState } from "react";
import { useNavigate } from "react-router-dom";
import carIcon from "../assets/vehicle/types/car.svg";
import motorcycleIcon from "../assets/vehicle/types/motorcycle.svg";

function getIconPath(type: string): string {
  if (type == "Bromfiets" || type == "Motorfiets") {
    return motorcycleIcon;
  }
  return carIcon;
}

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

function VehicleItem({ vehicleData }: { vehicleData: any }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDeleteVehicle = (event: React.MouseEvent<HTMLDivElement>) => {
    navigate(location.pathname, {
      state: { vehicle_prep_deleted: event.currentTarget.dataset.id },
    });
  };

  return (
    <div className="accordion-item">
      <div className="accordion-header" id={`heading-${vehicleData.id}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${vehicleData.id}`}
          aria-expanded="true"
          aria-controls="collapse"
        >
          <div className="notification-image-container me-3 flex-shrink-0">
            <img
              src={getIconPath(vehicleData.voertuigsoort)}
              className="w-100"
              alt="Image"
            ></img>
          </div>
          <div>
            <p className="mb-0">
              <strong className="highlight">
                {capitalizeFirstLetter(vehicleData.merk)}{" "}
                {vehicleData.handelsbenaming}
              </strong>
            </p>
            <p className="mb-0 fs-6">{vehicleData.kenteken}</p>
          </div>
        </button>
      </div>
      <div
        id={`collapse-${vehicleData.id}`}
        className="accordion-collapse collapse bg-white"
        aria-labelledby={`heading-${vehicleData.id}`}
      >
        <div className="accordion-body">
          <div className="row mt-2 mb-1">
            <div className="col col-md-8">
              <div className="row">
                <div className="col d-flex d-flex align-items-center my-3">
                  <div className="notification-image-container me-3 flex-shrink-0">
                    <img
                      src={"/icons/vehicle/calender.png"}
                      className="h-100"
                      alt="Image"
                    ></img>
                  </div>
                  <div>
                    <p className="text-muted mb-0">Bouwjaar</p>
                    <p className="mb-0 fw-bold">
                      {capitalizeFirstLetter(vehicleData.info.bouwjaar)}
                    </p>
                  </div>
                </div>
                <div className="col d-flex d-flex align-items-center my-3">
                  <div className="notification-image-container me-3 flex-shrink-0">
                    <img
                      src={"/icons/vehicle/gas-pump.png"}
                      className="h-100"
                      alt="Image"
                    ></img>
                  </div>
                  <div>
                    <p className="text-muted mb-0">Brandstof</p>
                    <p className="mb-0 fw-bold">
                      {capitalizeFirstLetter(vehicleData.info.brandstof)}
                    </p>
                  </div>
                </div>
                <div className="col d-flex d-flex align-items-center my-3">
                  <div className="notification-image-container me-3 flex-shrink-0">
                    <img
                      src={"/icons/vehicle/motor.svg"}
                      className="h-100"
                      alt="Image"
                    ></img>
                  </div>
                  <div>
                    <p className="text-muted mb-0">Motorinhoud</p>
                    <p className="mb-0 fw-bold">
                      {capitalizeFirstLetter(vehicleData.info.motorinhoud)}
                    </p>
                  </div>
                </div>
                <div className="col d-flex d-flex align-items-center my-3">
                  <div className="notification-image-container me-3 flex-shrink-0">
                    <img
                      src={"/icons/vehicle/horsepower.png"}
                      className="h-100"
                      alt="Image"
                    ></img>
                  </div>
                  <div>
                    <p className="text-muted mb-0">Vermogen</p>
                    <p className="mb-0 fw-bold">
                      {capitalizeFirstLetter(vehicleData.info.vermogen)}
                    </p>
                  </div>
                </div>
                <div className="col d-flex d-flex align-items-center my-3">
                  <div className="notification-image-container me-3 flex-shrink-0">
                    <img
                      src={"/icons/vehicle/co2-cloud.svg"}
                      className="h-100"
                      alt="Image"
                    ></img>
                  </div>
                  <div>
                    <p className="text-muted mb-0">Emissieklasse</p>
                    <p className="mb-0 fw-bold">
                      {capitalizeFirstLetter(vehicleData.info.emissieklasse)}
                    </p>
                  </div>
                </div>
                <div className="col d-flex d-flex align-items-center my-3"></div>
              </div>
            </div>
          </div>
          {Object.keys(vehicleData.extraInfo).map((key) => (
            <div key={`id-${vehicleData.id}-${key}`}>
              <p className="mb-0 mt-3">
                <strong className="highlight">
                  {capitalizeFirstLetter(key)}
                </strong>
              </p>
              {Object.keys(vehicleData.extraInfo[key]).map((key2) => (
                <div
                  className="row info-row d-flex align-items-center my-1"
                  key={`idin-${vehicleData.id}-${key2}`}
                >
                  <div className="col-md-3 col-5">
                    <p className="text-muted mb-0">
                      {capitalizeFirstLetter(key2.replace(/_/g, " "))}
                    </p>
                  </div>
                  <div className="col">
                    <p className="mb-0 fw-bold">
                      {capitalizeFirstLetter(vehicleData.extraInfo[key][key2])}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="row">
            <div className="col-md-5 col-xl-3 col-12">
              <div className="position-relative">
                <div
                  onClick={handleDeleteVehicle}
                  className={`btn w-100 my-3 ${loading && "disabled"}`}
                  data-plate={vehicleData.kenteken}
                  data-id={vehicleData.id}
                >
                  <span className={`${loading && "invisible"}`}>
                    Voertuig verwijderen
                  </span>
                </div>
                {loading && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white">
                    <div
                      className="spinner-border spinner-border-sm position-absolute"
                      role="status"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleItem;
