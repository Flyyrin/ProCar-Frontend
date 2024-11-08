import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axiosInstance from "./AxiosInstance";

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
    return `${minutes} ${minutes === 1 ? "minuut" : "minuten"} geleden`;
  } else if (differenceInSeconds < secondsInDay) {
    const hours = Math.floor(differenceInSeconds / secondsInHour);
    return `${hours} uur geleden`;
  } else {
    const days = Math.floor(differenceInSeconds / secondsInDay);
    return `${days} dag${days === 1 ? "" : "en"} geleden`;
  }
}

function Notification({ notificationData }: { notificationData: any }) {
  const handleDeleteNotification = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const listItem = event.currentTarget.closest(".list-group-item");
    listItem?.remove();

    axiosInstance
      .post("/DeleteNotification", {
        notificationId: notificationData.id,
      })
      .catch(function () {});
  };

  return (
    <li className="list-group-item p-3">
      <div className="d-flex d-flex align-items-center">
        <div className="notification-image-container me-3 flex-shrink-0">
          <img
            src={notificationData.imageSource}
            className="h-100"
            alt="Image"
          ></img>
        </div>
        <div className="">
          <p className="text-muted mb-0 fs-6">
            <small>{timeAgo(notificationData.createdDate)}</small>
          </p>
          <p className="mb-0 markdownContainer">
            {<ReactMarkdown>{notificationData.content}</ReactMarkdown>}
          </p>
          <NavLink
            className="mb-0 btn-outline border-0"
            to={`${notificationData.buttonTarget}`}
          >
            <strong className="">{notificationData.buttonText}</strong>
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
                onClick={handleDeleteNotification}
              >
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
