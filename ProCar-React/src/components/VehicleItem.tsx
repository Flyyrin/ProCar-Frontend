import carIcon from "../assets/vehicleTypes/car.svg";
import motorcycleIcon from "../assets/vehicleTypes/motorcycle.svg";

interface VehicleItemData {
  id: string;
  type: string;
  brand: string;
  commercialName: string;
  licensePlate: string;
}

function getIconPath(type: string): string {
  if (type == "Bromfiets") {
    return motorcycleIcon;
  }
  return carIcon;
}

function VehicleItem({
  vehicleItemData = {
    id: "",
    type: "",
    brand: "",
    commercialName: "",
    licensePlate: "",
  },
}: {
  vehicleItemData?: VehicleItemData;
}) {
  return (
    <div className="accordion-item">
      <div className="accordion-header" id={`heading-${vehicleItemData.id}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${vehicleItemData.id}`}
          aria-expanded="true"
          aria-controls="collapse"
        >
          <div className="notification-image-container me-3 flex-shrink-0">
            <img
              src={getIconPath(vehicleItemData.type)}
              className="w-100"
              alt="Image"
            ></img>
          </div>
          <div>
            <p className="mb-0">
              <strong className="highlight">
                {vehicleItemData.brand} {vehicleItemData.commercialName}
              </strong>
            </p>
            <p className="text-muted mb-0 fs-6">
              <small>{vehicleItemData.licensePlate}</small>
            </p>
          </div>
        </button>
      </div>
      <div
        id={`collapse-${vehicleItemData.id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading-${vehicleItemData.id}`}
      >
        <div className="accordion-body">...</div>
      </div>
    </div>
  );
}

export default VehicleItem;
