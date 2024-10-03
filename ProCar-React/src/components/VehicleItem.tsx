import carIcon from "../assets/vehicle/types/car.svg";
import motorcycleIcon from "../assets/vehicle/types/motorcycle.svg";

function getIconPath(type: string): string {
  if (type == "Bromfiets") {
    return motorcycleIcon;
  }
  return carIcon;
}

function VehicleItem({ vehicleData }: { vehicleData: any }) {
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
                {vehicleData.merk} {vehicleData.handelsbenaming}
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
            <div className="row info-row">
              <div className="col-md-3 col-5">
                <p className="text-muted mb-0 text-capitalize">
                  {key.replace(/_/g, " ")}
                </p>
              </div>
              <div className="col">
                <p className="mb-0 text-capitalize fw-bold">
                  {vehicleData.info[key]}
                </p>
              </div>
            </div>
          ))}
          {Object.keys(vehicleData.extraInfo).map((key) => (
            <>
              <p className="mb-0 mt-3 text-capitalize">
                <strong className="highlight">{key}</strong>
              </p>
              {Object.keys(vehicleData.extraInfo[key]).map((key2) => (
                <div className="row info-row">
                  <div className="col-md-3 col-5">
                    <p className="text-muted mb-0 text-capitalize">
                      {key2.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div className="col">
                    <p className="mb-0 text-capitalize fw-bold">
                      {vehicleData.extraInfo[key][key2]}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VehicleItem;
