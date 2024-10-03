import carIcon from "../assets/vehicleTypes/car.svg";
import motorcycleIcon from "../assets/vehicleTypes/motorcycle.svg";
import { Vehicle } from "../interfaces/Vehicle";

function getIconPath(type: string): string {
  if (type == "Bromfiets") {
    return motorcycleIcon;
  }
  return carIcon;
}

function VehicleItem({ vehicleData }: { vehicleData: Vehicle }) {
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
              src={getIconPath(vehicleData.type)}
              className="w-100"
              alt="Image"
            ></img>
          </div>
          <div>
            <p className="mb-0">
              <strong className="highlight">
                {vehicleData.brand} {vehicleData.commercialName}
              </strong>
            </p>
            <p className="text-muted mb-0 fs-6">
              <small>{vehicleData.licensePlate}</small>
            </p>
          </div>
        </button>
      </div>
      <div
        id={`collapse-${vehicleData.id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading-${vehicleData.id}`}
      >
        <div className="accordion-body">...</div>
      </div>
    </div>
  );
}

export default VehicleItem;
