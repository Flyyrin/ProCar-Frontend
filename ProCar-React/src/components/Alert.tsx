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
    <div className={`alert alert-${alertStatus.type}`} role="alert">
      <div className="d-flex align-items-center">
        <i
          className={`bi ${
            alertStatus.type == "success"
              ? "bi-check-circle"
              : "bi-exclamation-triangle"
          } me-2 h3 mb-0`}
        ></i>
        <span className="align-middle">{alertStatus.message}</span>
      </div>
    </div>
  );
}

export default Alert;
