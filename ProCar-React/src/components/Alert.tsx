interface AlertStatus {
  type: string;
  message: string;
}

function Alert({
  alertStatus = {
    type: "success",
    message: "Success",
  },
}: {
  alertStatus?: AlertStatus;
}) {
  return (
    <div
      className={`alert alert-${alertStatus.type} alert-dismissible pe-3 fade show`}
      role="alert"
    >
      <div className="d-flex align-items-center">
        <i
          className={`bi ${
            alertStatus.type == "success"
              ? "bi-check-circle"
              : "bi-exclamation-triangle"
          } me-2 h3 mb-0`}
        ></i>
        <span className="align-middle">{alertStatus.message}</span>
        <i
          className={`bi bi-x h2 mb-0 click ms-auto`}
          data-bs-dismiss="alert"
        ></i>
      </div>
    </div>
  );
}

export default Alert;
