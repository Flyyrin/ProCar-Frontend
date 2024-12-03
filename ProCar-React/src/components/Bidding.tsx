import { useState, useEffect, useRef } from "react";
import Alert from "./Alert";
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

function Bidding({
  biddingId,
  price,
  owner,
}: {
  biddingId: string;
  price: number;
  owner: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [biddingData, setBiddingData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [placeBidLoading, setPlaceBidLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(`wss://localhost:7022/bidding/${biddingId}`);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data != null) {
          setLoading(false);
        }
        setHighestBidPrice(data?.highestBid);
        setBiddingData(data);
      } catch {
        socket.close();
        setApiError(true);
      }
    };

    socket.onerror = () => {
      setApiError(true);
    };

    socket.onclose = () => {
      setApiError(true);
    };
  }, [biddingId]);

  const [highestBidPrice, setHighestBidPrice] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [priceInvalid, setPriceInvalid] = useState(false);
  const validatePrice = (val?: string) => {
    const milRegex = /^\d+$/;
    var mil = val ? val : priceValue;

    if (
      mil.length == 0 ||
      !milRegex.test(mil) ||
      mil.length > 10 ||
      parseInt(mil) < price ||
      parseInt(mil) < parseInt(highestBidPrice) + 1
    ) {
      setPriceInvalid(true);
      return false;
    }

    setPriceInvalid(false);
    return true;
  };

  const handlePlaceBid = () => {
    var priceValid = validatePrice();

    if (priceValid) {
      const formData = new FormData();
      formData.append("price", priceValue);
      formData.append("listingId", biddingId);

      setPlaceBidLoading(true);
      axiosInstance
        .post("/bid", formData)
        .then(function () {
          if (inputRef.current) {
            inputRef.current.value = "";
          }
          setPlaceBidLoading(false);
        })
        .catch(function () {
          setApiError(true);
          setPlaceBidLoading(false);
          window.scrollTo(0, 0);
        });
    }
  };

  return apiError ? (
    <Alert
      alertStatus={{
        type: "danger",
        message: "Er is iets mis gegaan, probeer het later nog eens.",
      }}
    />
  ) : loading ? (
    <ul className="list-group mt-3 mb-0">
      <li className="list-group-item p-4 d-flex justify-content-center align-items-center highlight">
        <div className="spinner-border" role="status" />
      </li>
    </ul>
  ) : (
    <div className="card">
      <div className="card-body">
        <div className="mb-2">
          <label htmlFor="priceInput" className="form-label mb-0">
            Bedrag
          </label>
          <p className="text-muted">
            {owner
              ? "Je kan niet bieden op je eigen advertentie"
              : `Bieden vanaf €${price},-`}
          </p>
          <input
            type="text"
            name="bidPrice"
            id="priceInput"
            ref={inputRef}
            className={`form-control ${priceInvalid ? "is-invalid" : ""} ${
              owner ? "text-muted" : ""
            }`}
            disabled={placeBidLoading || owner}
            onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
              setPriceValue(event.target.value);
              validatePrice(event.target.value);
            }}
          />
          <div className={`invalid-feedback ${priceInvalid && "d-block"}`}>
            <i className="bi bi-exclamation-triangle"></i> Ongeldige prijs
            (Bieden vanaf €{price}
            ,- en hoger dan €{highestBidPrice},-).
          </div>
        </div>

        {/*  */}
        <div className="position-relative">
          <div
            className={`d-flex align-items-center justify-content-center btn w-100 ${
              (placeBidLoading || owner) && "disabled"
            }`}
            onClick={handlePlaceBid}
          >
            <i
              className={`bi bi-hammer h5 mb-0 ${
                placeBidLoading && "invisible"
              }`}
            ></i>
            <span
              className={`align-middle ms-2 ${placeBidLoading && "invisible"}`}
            >
              Plaats bod
            </span>
          </div>
          {placeBidLoading && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white">
              <div
                className="spinner-border spinner-border-sm position-absolute"
                role="status"
              />
            </div>
          )}
        </div>
        {/*  */}
        <div className="w-100 border border-2 my-3"></div>
        {biddingData?.biddings && biddingData.biddings.length > 0 ? (
          biddingData.biddings.map((bidding: any, index: number) => (
            <div
              className="row info-row d-flex align-items-center my-2"
              key={index}
            >
              <div className="col">
                <p className="text-muted mb-0">{bidding.UserName}</p>
              </div>
              <div className="col">
                <p className="mb-0 fw-bold d-flex justify-content-center">
                  €{bidding.Price},-
                </p>
              </div>
              <div className="col">
                <p className="text-muted mb-0 fs-6">
                  <small>{timeAgo(bidding.Date)}</small>{" "}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center mb-0">
            Geen biedingen geplaatst
          </p>
        )}
      </div>
    </div>
  );
}

export default Bidding;
