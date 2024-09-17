function timeAgo(timestamp: string | number): string {
  const now = new Date();
  const differenceInSeconds = Math.floor(
    (now.getTime() - new Date(timestamp).getTime()) / 1000
  );

  const secondsInMinute = 60;
  const secondsInHour = 60 * 60;
  const secondsInDay = 60 * 60 * 24;

  if (differenceInSeconds < secondsInMinute) {
    return "Nu";
  } else if (differenceInSeconds < secondsInHour) {
    const minutes = Math.floor(differenceInSeconds / secondsInMinute);
    return `${minutes} minuut${minutes === 1 ? "" : "en"} geleden`;
  } else if (differenceInSeconds < secondsInDay) {
    const hours = Math.floor(differenceInSeconds / secondsInHour);
    return `${hours} uur geleden`;
  } else {
    const days = Math.floor(differenceInSeconds / secondsInDay);
    return `${days} dag${days === 1 ? "" : "en"} geleden`;
  }
}

interface NotificationStatus {
  image: string;
  timestamp: string;
  message: string;
  button?: string;
  source?: string;
}

function Notification({
  notificationStatus = {
    image: "",
    timestamp: "",
    message: "",
  },
}: {
  notificationStatus?: NotificationStatus;
}) {
  return (
    <li className="list-group-item p-3">
      <div className="d-flex d-flex align-items-center">
        <div className="notification-image-container me-3 flex-shrink-0">
          <img
            src={notificationStatus.image}
            className="h-100"
            alt="Image"
          ></img>
        </div>
        <div className="">
          <p className="text-muted mb-0 fs-6">
            <small>{timeAgo(notificationStatus.timestamp)}</small>
          </p>
          <p className="mb-0">{notificationStatus.message}</p>
          <a
            className="mb-0 btn-outline border-0"
            href={notificationStatus.source}
          >
            <strong className="">{notificationStatus.button}</strong>
          </a>
        </div>
        <div className="ms-auto d-flex align-items-center">
          <i
            className="bi bi-three-dots-vertical h5 ms-2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" type="button">
                Verwijder melding
              </button>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}

export default Notification;
