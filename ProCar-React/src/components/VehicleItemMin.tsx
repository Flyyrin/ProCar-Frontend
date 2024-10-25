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
  return (
    <li
      className="list-group-item d-flex align-items-center py-1"
      data-id={vehicleData.id}
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
    </li>
  );
}

export default VehicleItem;
