import { NavLink, useNavigate } from "react-router-dom";

function ListingPreview({ listingData }: { listingData: any }) {
  const navigate = useNavigate();

  const handleEditListing = () => {
    navigate(`/listing/${listingData.listingId}`);
  };

  return (
    <li className="list-group-item p-3">
      <div className="d-flex d-flex align-items-center">
        <div className="notification-image-container me-3 flex-shrink-0">
          <img
            src={listingData.previewImagePath}
            className="h-100"
            alt="Image"
          ></img>
        </div>
        <div className="">
          <p className="text-muted mb-0 fs-6">
            <small>{listingData.createdDate}</small>
          </p>
          <p className="mb-0 fw-bold">{listingData.title}</p>
          <p className="mb-0">
            {!listingData.bidding ? "Bieden vanaf" : ""} €{listingData.price}
            ,-
          </p>
          <NavLink
            className="mb-0 btn-outline border-0"
            to={`/listing/${listingData.listingId}`}
          >
            <strong className="">Bekijk advertentie</strong>
          </NavLink>
        </div>
        <div className="ms-auto d-flex align-items-center">
          <i
            className="bi bi-three-dots-vertical h5 ms-2 click"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={handleEditListing}
              >
                Advertentie bewerken
              </button>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}

export default ListingPreview;
