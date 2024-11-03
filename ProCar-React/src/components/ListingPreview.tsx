import { NavLink, useNavigate } from "react-router-dom";

function formatDate(dateString: string) {
  if (!dateString) {
    return "";
  }

  const truncatedDateString = dateString.split(".")[0];
  const date = new Date(truncatedDateString);

  if (isNaN(date.getTime())) {
    return "";
  }

  const formatter = new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatter.format(date);
}

function ListingPreview({
  listingData,
  edit = true,
}: {
  listingData: any;
  edit: boolean;
}) {
  const navigate = useNavigate();

  const handleEditListing = () => {
    navigate(`/listing/${listingData.listingId}`);
  };

  return (
    <li className="list-group-item p-3">
      <div className="d-flex d-flex align-items-center">
        <div className="listingPreview-image-container me-3 flex-shrink-0">
          <NavLink to={`/listing/${listingData.listingId}`}>
            <img
              src={listingData.image1Path}
              className="h-100"
              alt="Image"
            ></img>
          </NavLink>
        </div>
        <div className="">
          <p className="text-muted mb-0 fs-6">
            <small>{formatDate(listingData.createdDate)}</small>
          </p>
          <p className="mb-0 fw-bold">{listingData.title}</p>
          <p className="mb-0">
            {listingData.bidding ? "Bieden vanaf" : ""} €{listingData.price}
            ,-
          </p>
          <div className="d-flex text-muted fw-bold">
            <div className="d-flex align-items-center justify-content-center me-2">
              <i className="bi bi-eye-fill h6 mb-0"></i>
              <small className="align-middle ms-1">{listingData.views}</small>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <i className="bi bi-star-fill h6 mb-0"></i>
              <small className="align-middle ms-1">{listingData.stars}</small>
            </div>
          </div>
          <NavLink
            className="mb-0 btn-outline border-0"
            to={`/listing/${listingData.listingId}`}
          >
            <strong className="">Bekijk advertentie</strong>
          </NavLink>
        </div>
        {edit && (
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
        )}
      </div>
    </li>
  );
}

export default ListingPreview;
