import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./AxiosInstance";
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
    setLoading(true);
    axiosInstance
      .post("/DeleteVehicle", {
        vehicleId: event.currentTarget.dataset.id,
      })
      .then(function (response) {
        if (response.status === 200) {
          setLoading(false);
          navigate(location.pathname, {
            state: { vehicle_deleted: true },
            replace: true,
          });
          window.scrollTo(0, 0);
        }
      })
      .catch(function () {
        navigate(location.pathname, {
          state: { api_error: true },
          replace: true,
        });
        setLoading(false);
        window.scrollTo(0, 0);
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
          {Object.keys(vehicleData.info).map((key) => (
            <div className="row info-row d-flex align-items-center my-1">
              <div className="col-md-3 col-5">
                <p className="text-muted mb-0">
                  {capitalizeFirstLetter(key.replace(/_/g, " "))}
                </p>
              </div>
              <div className="col">
                <p className="mb-0 fw-bold">
                  {capitalizeFirstLetter(vehicleData.info[key])}
                </p>
              </div>
            </div>
          ))}
          {Object.keys(vehicleData.extraInfo).map((key) => (
            <>
              <p className="mb-0 mt-3">
                <strong className="highlight">
                  {capitalizeFirstLetter(key)}
                </strong>
              </p>
              {Object.keys(vehicleData.extraInfo[key]).map((key2) => (
                <div className="row info-row d-flex align-items-center my-1">
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
            </>
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
