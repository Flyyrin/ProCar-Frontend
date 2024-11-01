import Helmet from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import axiosInstance from "../components/AxiosInstance";
import { useState, useRef, useEffect } from "react";
import "../styles/ImageBox.css";
import VehicleItem from "../components/VehicleItemMin";
import { NavLink, useNavigate } from "react-router-dom";

function Sell() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState(false);
  const [invalidFileSize, setInvalidFileSize] = useState(false);
  const [invalidFileType, setInvalidFileType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postalLoading, setPostalLoading] = useState(false);

  const image1InputRef = useRef<HTMLInputElement | null>(null);
  const image2InputRef = useRef<HTMLInputElement | null>(null);
  const image3InputRef = useRef<HTMLInputElement | null>(null);
  const image4InputRef = useRef<HTMLInputElement | null>(null);
  const image5InputRef = useRef<HTMLInputElement | null>(null);

  const [image1Invalid, setImage1Invalid] = useState(false);
  const [image2Invalid, setImage2Invalid] = useState(false);
  const [image3Invalid, setImage3Invalid] = useState(false);
  const [image4Invalid, setImage4Invalid] = useState(false);
  const [image5Invalid, setImage5Invalid] = useState(false);

  const [titleValue, settitleValue] = useState("");
  const [titleInvalid, setTitleInvalid] = useState(false);
  const maxTitleLength = 45;

  const [desValue, setDesValue] = useState("");
  const [desInvalid, setdesInvalid] = useState(false);
  const maxDesLength = 500;

  const [locValue, setLocValue] = useState("");
  const [locInvalid, setLocInvalid] = useState(false);
  const [postalInvalid, setPostalInvalid] = useState(true);
  const [postalCity, setPostalCity] = useState("-");

  const [milValue, setMilValue] = useState("");
  const [milInvalid, setMilInvalid] = useState(false);

  const [bidding, setBidding] = useState(false);
  const [priceValue, setPriceValue] = useState("");
  const [priceInvalid, setPriceInvalid] = useState(false);

  const [vehIdInValid, setVehIdInValid] = useState(false);

  const handleUploadBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setImage1Invalid(false);
    setImage2Invalid(false);
    setImage3Invalid(false);
    setImage4Invalid(false);
    setImage5Invalid(false);
    setInvalidFileType(false);
    setInvalidFileType(false);

    const target = e.target as HTMLElement;
    const nearestInput = target
      .closest(".innerContainer")
      ?.querySelector('input[type="file"]');

    if (nearestInput) {
      (nearestInput as HTMLInputElement).click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage1Invalid(false);
    setImage2Invalid(false);
    setImage3Invalid(false);
    setImage4Invalid(false);
    setImage5Invalid(false);

    const fileInput = e.target;
    const file = fileInput.files?.[0];

    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      const fileType = file.type;

      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      const isValidType = validTypes.includes(fileType);

      const maxSize = 300;
      const isValidSize = fileSizeMB <= maxSize;

      if (!isValidType) {
        setInvalidFileType(true);
        fileInput.value = "";
        return;
      }

      if (!isValidSize) {
        setInvalidFileSize(true);
        alert("File size exceeds 300MB.");
        fileInput.value = "";
        return;
      }

      const imageUrl = URL.createObjectURL(file);

      const target = e.target as HTMLElement;
      const nearestUploadBoxPreview = target
        .closest(".innerContainer")
        ?.querySelector(".uploadBoxPreviewImg");

      if (nearestUploadBoxPreview) {
        (nearestUploadBoxPreview as HTMLInputElement).src = imageUrl;
      }

      const nearestUploadBoxPreviewContainer = target
        .closest(".innerContainer")
        ?.querySelector(".uploadBoxPreviewContainer");

      if (nearestUploadBoxPreviewContainer) {
        (nearestUploadBoxPreviewContainer as HTMLInputElement).style.display =
          "flex";
      }
    }
  };

  const handlePanelRemoveClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    const nearestInput = target
      .closest(".innerContainer")
      ?.querySelector('input[type="file"]');

    if (nearestInput) {
      (nearestInput as HTMLInputElement).value = "";
    }

    const nearestUploadBoxPreviewContainer = target
      .closest(".innerContainer")
      ?.querySelector(".uploadBoxPreviewContainer");

    if (nearestUploadBoxPreviewContainer) {
      (nearestUploadBoxPreviewContainer as HTMLInputElement).style.display =
        "none";
    }
  };

  const handlePanelRotateClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    const nearestInput = target
      .closest(".innerContainer")
      ?.querySelector('input[type="file"]');

    const nearestInputElement = nearestInput as HTMLInputElement;
    if (nearestInput && nearestInputElement.files) {
      const file = nearestInputElement.files[0];

      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.height;
        canvas.height = img.width;

        ctx?.translate(canvas.width / 2, canvas.height / 2);
        ctx?.rotate((90 * Math.PI) / 180);

        ctx?.drawImage(img, -img.width / 2, -img.height / 2);

        const rotatedImageUrl = canvas.toDataURL(file.type);

        const nearestUploadBoxPreview = target
          .closest(".innerContainer")
          ?.querySelector(".uploadBoxPreviewImg") as HTMLImageElement;

        if (nearestUploadBoxPreview) {
          nearestUploadBoxPreview.src = rotatedImageUrl;
        }

        fetch(rotatedImageUrl)
          .then((res) => res.blob())
          .then((rotatedBlob) => {
            const rotatedFile = new File([rotatedBlob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(rotatedFile);
            nearestInputElement.files = dataTransfer.files;
          });
      };
    }

    const nearestUploadBoxPreview = target
      .closest(".innerContainer")
      ?.querySelector(".uploadBoxPreviewImg");

    if (nearestUploadBoxPreview) {
      (nearestUploadBoxPreview as HTMLInputElement).src = "";
    }
  };

  const validateImage1 = () => {
    if (!image1InputRef.current || !image1InputRef.current?.files?.length) {
      setImage1Invalid(true);
      return false;
    }
    return true;
  };

  const validateImage2 = () => {
    if (!image2InputRef.current || !image2InputRef.current?.files?.length) {
      setImage2Invalid(true);
      return false;
    }
    return true;
  };

  const validateImage3 = () => {
    if (!image3InputRef.current || !image3InputRef.current?.files?.length) {
      setImage3Invalid(true);
      return false;
    }
    return true;
  };

  const validateImage4 = () => {
    if (!image4InputRef.current || !image4InputRef.current?.files?.length) {
      setImage4Invalid(true);
      return false;
    }
    return true;
  };

  const validateImage5 = () => {
    if (!image5InputRef.current || !image5InputRef.current?.files?.length) {
      setImage5Invalid(true);
      return false;
    }
    return true;
  };

  const validateTitle = (val?: string) => {
    if (val) {
      if (val.length > maxTitleLength || val.length == 0) {
        setTitleInvalid(true);
        return false;
      }
    } else {
      if (titleValue.length > maxTitleLength || titleValue.length == 0) {
        setTitleInvalid(true);
        return false;
      }
    }
    setTitleInvalid(false);
    return true;
  };

  const validateDes = (val?: string) => {
    if (val) {
      if (val.length > maxDesLength || val.length == 0) {
        setdesInvalid(true);
        return false;
      }
    } else {
      if (desValue.length > maxDesLength || desValue.length == 0) {
        setdesInvalid(true);
        return false;
      }
    }
    setdesInvalid(false);
    return true;
  };

  const validateLoc = (val?: string) => {
    var loc = val ? val : locValue;

    if (loc.length == 0 || postalInvalid) {
      setLocInvalid(true);
      return false;
    }
    setLocInvalid(false);
    return true;
  };

  const validSearchPostal = (val?: string) => {
    const postalRegex = /^\d{4}[A-Za-z]{2}$/;
    var postal = val ? val : locValue;
    postal = postal.replace(/\s+/g, "");
    if (postalRegex.test(postal)) {
      setPostalLoading(true);
      axiosInstance
        .get(`/CheckPostal?postal=${postal}`)
        .then(function (response) {
          if (
            response.data.response.docs[0] &&
            response.data.response.docs[0].type == "postcode" &&
            response.data.response.docs[0].woonplaatsnaam
          ) {
            const city = response.data.response.docs[0].woonplaatsnaam;
            setPostalCity(city);
            setPostalLoading(false);
            setPostalInvalid(false);
            setLocInvalid(false);
            return true;
          } else {
            setPostalLoading(false);
            setPostalInvalid(true);
            return false;
          }
        })
        .catch(function (error) {
          if (error.response.status === 400) {
            setPostalLoading(false);
            setPostalInvalid(true);
            return false;
          } else {
            setPostalLoading(false);
            setApiError(true);
            window.scrollTo(0, 0);
          }
        });
    }
  };

  const validateMil = (val?: string) => {
    const milRegex = /^\d+$/;
    const maxMil = 1000000;
    var mil = val ? val : milValue;

    if (mil.length == 0 || !milRegex.test(mil)) {
      setMilInvalid(true);
      return false;
    }

    if (parseInt(mil, 10) > maxMil) {
      setMilInvalid(true);
      return false;
    }

    setMilInvalid(false);
    return true;
  };

  const validatePrice = (val?: string) => {
    const milRegex = /^\d+$/;
    var mil = val ? val : milValue;

    if (mil.length == 0 || !milRegex.test(mil) || mil.length > 10) {
      setPriceInvalid(true);
      return false;
    }

    setPriceInvalid(false);
    return true;
  };

  const validateVehId = () => {
    if (activeId == "") {
      setVehIdInValid(true);
      return false;
    }
    setVehIdInValid(false);
    return true;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(false);

    const image1Valid = validateImage1();
    const image2Valid = validateImage2();
    const image3Valid = validateImage3();
    const image4Valid = validateImage4();
    const image5Valid = validateImage5();

    const titleValid = validateTitle();
    const desValid = validateDes();
    const milValid = validateMil();
    const locValid = validateLoc();
    const vehIdValid = validateVehId();
    const priceValid = validatePrice();

    if (
      image1Valid &&
      image2Valid &&
      image3Valid &&
      image4Valid &&
      image5Valid &&
      titleValid &&
      desValid &&
      milValid &&
      locValid &&
      vehIdValid &&
      priceValid
    ) {
      const formData = new FormData();
      formData.append("vehicleId", activeId);

      if (image1InputRef.current?.files?.[0]) {
        formData.append("image1", image1InputRef.current.files[0]);
      }
      if (image2InputRef.current?.files?.[0]) {
        formData.append("image2", image2InputRef.current.files[0]);
      }
      if (image3InputRef.current?.files?.[0]) {
        formData.append("image3", image3InputRef.current.files[0]);
      }
      if (image4InputRef.current?.files?.[0]) {
        formData.append("image4", image4InputRef.current.files[0]);
      }
      if (image5InputRef.current?.files?.[0]) {
        formData.append("image5", image5InputRef.current.files[0]);
      }

      formData.append("title", titleValue);
      formData.append("description", desValue);
      formData.append("bidding", bidding.toString());
      formData.append("price", priceValue);
      formData.append("mileage", milValue);
      formData.append("postal", locValue);
      formData.append("city", postalCity);

      setLoading(true);
      axiosInstance
        .post("/PostListing", formData)
        .then(function (response) {
          if (response.status === 200) {
            navigate(`/listing/${response.data.listingId}`, {
              state: { listing_placed: true },
            });
          }
        })
        .catch(function () {
          setApiError(true);
          setLoading(false);
          window.scrollTo(0, 0);
        });
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const [loadingVeh, setLoadingVeh] = useState(true);
  const [vehicleData, setVehicleData] = useState<any[]>([]);
  function loadVehicles() {
    setLoadingVeh(true);
    axiosInstance
      .get(`/GetUserVehicles`)
      .then(function (response) {
        if (response.status === 200) {
          setVehicleData(response.data);
          setApiError(false);
          setLoadingVeh(false);
        }
      })
      .catch(function () {
        setApiError(true);
        setLoadingVeh(false);
        window.scrollTo(0, 0);
      });
  }

  const [activeId, setActiveId] = useState("");
  const handleListClick = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!loading) {
      setVehIdInValid(false);
      const target = e.target as HTMLElement;
      const clickedLi = target.closest("li");

      if (clickedLi) {
        const itemId = clickedLi.getAttribute("data-id");
        setActiveId(itemId || "");

        const listItems = (clickedLi.parentElement as HTMLUListElement)
          .children;
        for (let item of listItems) {
          item.classList.remove("selected");
        }

        (clickedLi as HTMLLIElement).classList.add("selected");
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleUploadBoxDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setImage1Invalid(false);
    setImage2Invalid(false);
    setImage3Invalid(false);
    setImage4Invalid(false);
    setImage5Invalid(false);
    setInvalidFileType(false);
    setInvalidFileType(false);

    const files = Array.from(e.dataTransfer.files);

    const target = e.target as HTMLElement;
    const nearestInput = target
      .closest(".innerContainer")
      ?.querySelector('input[type="file"]');

    if (nearestInput) {
      (nearestInput as HTMLInputElement).click();
    }
  };

  return (
    <>
      <Helmet>
        <title>Voertuig verkopen - ProCar</title>
        <meta name="authorize"></meta>
      </Helmet>
      <Header />
      <div className="container mt-4">
        <h3 className="fw-bold my-4 text-md-center ps-2 ps-md-0">
          Voertuig verkopen
        </h3>
        <div className="row d-flex justify-content-center">
          <div className="col col-lg-10">
            {apiError && (
              <Alert
                alertStatus={{
                  type: "danger",
                  message: "Er is iets mis gegaan, probeer het later nog eens.",
                }}
              />
            )}
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleFormSubmit} noValidate>
                  <div
                    className={`invalid-feedback mb-3 ${
                      (image1Invalid ||
                        image2Invalid ||
                        image3Invalid ||
                        image4Invalid ||
                        image5Invalid ||
                        titleInvalid ||
                        desInvalid ||
                        milInvalid ||
                        locInvalid ||
                        vehIdInValid ||
                        priceInvalid) &&
                      "d-block"
                    }`}
                  >
                    <i className="bi bi-exclamation-triangle"></i> Vul alle
                    velden in.
                  </div>
                  <h4 className="fw-bold mb-3">Voertuig</h4>
                  {loadingVeh ? (
                    <ul className="list-group">
                      <li className="list-group-item p-4 d-flex justify-content-center align-items-center highlight">
                        <div className="spinner-border" role="status" />
                      </li>
                    </ul>
                  ) : vehicleData.length > 0 ? (
                    <ul
                      className={`list-group border ${
                        vehIdInValid ? "is-invalid" : ""
                      }`}
                      onClick={handleListClick}
                    >
                      {vehicleData.map((vehicle) => (
                        <VehicleItem vehicleData={vehicle} key={vehicle.id} />
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-group">
                      <li className="list-group-item p-4 border-0">
                        <p className="text-center m-3">
                          Je hebt nog geen voertuigen toegevoegd
                        </p>
                        <NavLink
                          className="nav-link m-0 p-0 ps-2 text-md-center"
                          to="/account/add_vehicle"
                        >
                          <div className="btn btn-sm text-white mb-3">
                            Voertuig toevoegen
                          </div>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                  <div
                    className={`invalid-feedback ${vehIdInValid && "d-block"}`}
                  >
                    <i className="bi bi-exclamation-triangle"></i> Kies een
                    voertuig.
                  </div>

                  <div className="w-100 border border-2 mt-4 mb-3"></div>
                  <h4 className="fw-bold mb-0">Foto's</h4>
                  <p>
                    <small>
                      Vermeld zoveel mogelijk nauwkeurige productgegevens
                      wanneer je de advertentie maakt, om de kwaliteit te
                      verbeteren en je kans op succes te vergroten.
                    </small>
                  </p>
                  <div className="row">
                    <div className="col col-md-8">
                      {invalidFileType && (
                        <>
                          <div className="ms-2">
                            <Alert
                              alertStatus={{
                                type: "danger",
                                message:
                                  "Ongeldig bestand (alleen .jpg, .jpeg of .png).",
                              }}
                            />
                          </div>
                        </>
                      )}
                      {invalidFileSize && (
                        <>
                          <div className="ms-2">
                            <Alert
                              alertStatus={{
                                type: "danger",
                                message: "Ongeldig bestand (maximaal 300 mb).",
                              }}
                            />
                          </div>
                        </>
                      )}
                      <div
                        className={`imageBox mb-0 ${loading ? "disabled" : ""}`}
                      >
                        <div className="mainContainer">
                          <div className="innerContainer">
                            <input
                              name="image1"
                              type="file"
                              accept=".jpg, .jpeg, .png"
                              onChange={handleFileChange}
                              hidden
                              ref={image1InputRef}
                            />
                            <div
                              className={`uploadBox main ${
                                image1Invalid ? "invalid" : ""
                              }`}
                            >
                              <div
                                className="uploadBoxHitbox"
                                onClick={handleUploadBoxClick}
                                onDrop={handleUploadBoxDrop}
                                onDragOver={handleDragOver}
                              ></div>
                              <div className="uploadBoxPreviewContainer">
                                <div
                                  className="uploadBoxPreviewPanelLeft"
                                  onClick={handlePanelRotateClick}
                                >
                                  <i className="bi bi-arrow-clockwise h3"></i>
                                </div>
                                <div
                                  className="uploadBoxPreviewPanelRight"
                                  onClick={handlePanelRemoveClick}
                                >
                                  <i className="bi bi-trash3-fill h3"></i>
                                </div>
                                <div className="uploadBoxPreview">
                                  <img
                                    className="uploadBoxPreviewImg"
                                    src=""
                                  ></img>
                                </div>
                              </div>
                              <div className="innerLabel">1</div>
                            </div>
                          </div>
                        </div>
                        <div className="secondContainer">
                          <div className="secondContainerRow">
                            <div className="secondInnerContainer">
                              <div className="innerContainer">
                                <input
                                  name="image2"
                                  type="file"
                                  accept=".jpg, .jpeg, .png"
                                  onChange={handleFileChange}
                                  hidden
                                  ref={image2InputRef}
                                />
                                <div
                                  className={`uploadBox ${
                                    image2Invalid ? "invalid" : ""
                                  }`}
                                >
                                  <div
                                    className="uploadBoxHitbox"
                                    onClick={handleUploadBoxClick}
                                    onDrop={handleUploadBoxDrop}
                                    onDragOver={handleDragOver}
                                  ></div>
                                  <div className="uploadBoxPreviewContainer">
                                    <div
                                      className="uploadBoxPreviewPanelLeft"
                                      onClick={handlePanelRotateClick}
                                    >
                                      <i className="bi bi-arrow-clockwise h3"></i>
                                    </div>
                                    <div
                                      className="uploadBoxPreviewPanelRight"
                                      onClick={handlePanelRemoveClick}
                                    >
                                      <i className="bi bi-trash3-fill h3"></i>
                                    </div>
                                    <div className="uploadBoxPreview">
                                      <img
                                        className="uploadBoxPreviewImg"
                                        src=""
                                      ></img>
                                    </div>
                                  </div>
                                  <div className="innerLabel">2</div>
                                </div>
                              </div>
                            </div>
                            <div className="secondInnerContainer">
                              <div className="innerContainer">
                                <input
                                  name="image3"
                                  type="file"
                                  accept=".jpg, .jpeg, .png"
                                  onChange={handleFileChange}
                                  hidden
                                  ref={image3InputRef}
                                />
                                <div
                                  className={`uploadBox ${
                                    image3Invalid ? "invalid" : ""
                                  }`}
                                >
                                  <div
                                    className="uploadBoxHitbox"
                                    onClick={handleUploadBoxClick}
                                    onDrop={handleUploadBoxDrop}
                                    onDragOver={handleDragOver}
                                  ></div>
                                  <div className="uploadBoxPreviewContainer">
                                    <div
                                      className="uploadBoxPreviewPanelLeft"
                                      onClick={handlePanelRotateClick}
                                    >
                                      <i className="bi bi-arrow-clockwise h3"></i>
                                    </div>
                                    <div
                                      className="uploadBoxPreviewPanelRight"
                                      onClick={handlePanelRemoveClick}
                                    >
                                      <i className="bi bi-trash3-fill h3"></i>
                                    </div>
                                    <div className="uploadBoxPreview">
                                      <img
                                        className="uploadBoxPreviewImg"
                                        src=""
                                      ></img>
                                    </div>
                                  </div>
                                  <div className="innerLabel">3</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="secondContainerRow">
                            <div className="secondInnerContainer">
                              <div className="innerContainer">
                                <input
                                  name="image4"
                                  type="file"
                                  accept=".jpg, .jpeg, .png"
                                  onChange={handleFileChange}
                                  hidden
                                  ref={image4InputRef}
                                />
                                <div
                                  className={`uploadBox ${
                                    image4Invalid ? "invalid" : ""
                                  }`}
                                >
                                  <div
                                    className="uploadBoxHitbox"
                                    onClick={handleUploadBoxClick}
                                    onDrop={handleUploadBoxDrop}
                                    onDragOver={handleDragOver}
                                  ></div>
                                  <div className="uploadBoxPreviewContainer">
                                    <div
                                      className="uploadBoxPreviewPanelLeft"
                                      onClick={handlePanelRotateClick}
                                    >
                                      <i className="bi bi-arrow-clockwise h3"></i>
                                    </div>
                                    <div
                                      className="uploadBoxPreviewPanelRight"
                                      onClick={handlePanelRemoveClick}
                                    >
                                      <i className="bi bi-trash3-fill h3"></i>
                                    </div>
                                    <div className="uploadBoxPreview">
                                      <img
                                        className="uploadBoxPreviewImg"
                                        src=""
                                      ></img>
                                    </div>
                                  </div>
                                  <div className="innerLabel">4</div>
                                </div>
                              </div>
                            </div>
                            <div className="secondInnerContainer">
                              <div className="innerContainer">
                                <input
                                  name="image5"
                                  type="file"
                                  accept=".jpg, .jpeg, .png"
                                  onChange={handleFileChange}
                                  hidden
                                  ref={image5InputRef}
                                />
                                <div
                                  className={`uploadBox ${
                                    image5Invalid ? "invalid" : ""
                                  }`}
                                >
                                  <div
                                    className="uploadBoxHitbox"
                                    onClick={handleUploadBoxClick}
                                    onDrop={handleUploadBoxDrop}
                                    onDragOver={handleDragOver}
                                  ></div>
                                  <div className="uploadBoxPreviewContainer">
                                    <div
                                      className="uploadBoxPreviewPanelLeft"
                                      onClick={handlePanelRotateClick}
                                    >
                                      <i className="bi bi-arrow-clockwise h3"></i>
                                    </div>
                                    <div
                                      className="uploadBoxPreviewPanelRight"
                                      onClick={handlePanelRemoveClick}
                                    >
                                      <i className="bi bi-trash3-fill h3"></i>
                                    </div>
                                    <div className="uploadBoxPreview">
                                      <img
                                        className="uploadBoxPreviewImg"
                                        src=""
                                      ></img>
                                    </div>
                                  </div>
                                  <div className="innerLabel">5</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`ms-2 invalid-feedback ${
                            (image1Invalid ||
                              image2Invalid ||
                              image3Invalid ||
                              image4Invalid ||
                              image5Invalid) &&
                            "d-block"
                          }`}
                        >
                          <i className="bi bi-exclamation-triangle"></i> Gebruik
                          5 duidelijke foto's.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 border border-2 mt-2 mb-3"></div>
                  <h4 className="fw-bold mb-0">Details</h4>
                  <div className="row">
                    <div className="col col-md-6">
                      <div className="mb-3 mt-3">
                        <label htmlFor="titleInput" className="form-label">
                          Titel
                        </label>
                        <input
                          type="text"
                          name="title"
                          className={`form-control ${
                            titleInvalid ? "is-invalid" : ""
                          }`}
                          id="titleInput"
                          disabled={loading}
                          onChange={async (
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            settitleValue(event.target.value);
                            validateTitle(event.target.value);
                          }}
                        />
                        <div
                          id="nameHelp"
                          className={`form-text ${
                            maxTitleLength - titleValue.length < 0 &&
                            "text-danger"
                          }`}
                        >
                          {maxTitleLength - titleValue.length < 0
                            ? `${-(
                                maxTitleLength - titleValue.length
                              )} tekens teveel`
                            : `${
                                maxTitleLength - titleValue.length
                              } tekens over.`}
                        </div>
                        <div
                          className={`invalid-feedback ${
                            titleInvalid && "d-block"
                          }`}
                        >
                          <i className="bi bi-exclamation-triangle"></i>
                          {maxTitleLength - titleValue.length < 0
                            ? "Titel mag niet te lang zijn."
                            : "Titel mag niet leeg zijn."}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="descInput" className="form-label">
                          Beschrijving
                        </label>
                        <textarea
                          name="title"
                          className={`form-control ${
                            desInvalid ? "is-invalid" : ""
                          }`}
                          id="descInput"
                          disabled={loading}
                          rows={5}
                          onChange={async (
                            event: React.ChangeEvent<HTMLTextAreaElement>
                          ) => {
                            setDesValue(event.target.value);
                            validateDes(event.target.value);
                          }}
                        ></textarea>
                        <div
                          id="nameHelp"
                          className={`form-text ${
                            maxTitleLength - titleValue.length < 0 &&
                            "text-danger"
                          }`}
                        >
                          {maxDesLength - desValue.length < 0
                            ? `${-(
                                maxDesLength - desValue.length
                              )} tekens teveel`
                            : `${maxDesLength - desValue.length} tekens over.`}
                        </div>
                        <div
                          className={`invalid-feedback ${
                            desInvalid && "d-block"
                          }`}
                        >
                          <i className="bi bi-exclamation-triangle"></i>{" "}
                          {maxDesLength - desValue.length < 0
                            ? "Beschrijving mag niet te lang zijn."
                            : "Beschrijving mag niet leeg zijn."}
                        </div>
                      </div>
                      <div className="mb-3 mt-3">
                        <label htmlFor="milInput" className="form-label">
                          Kilometerstand
                        </label>
                        <input
                          type="text"
                          name="title"
                          className={`form-control ${
                            milInvalid ? "is-invalid" : ""
                          }`}
                          id="milInput"
                          disabled={loading}
                          onChange={async (
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setMilValue(event.target.value);
                            validateMil(event.target.value);
                          }}
                        />
                        <div
                          className={`invalid-feedback ${
                            milInvalid && "d-block"
                          }`}
                        >
                          <i className="bi bi-exclamation-triangle"></i>{" "}
                          Ongeldige kilometerstand (vb. 15000km).
                        </div>
                      </div>
                      <div className="mb-3 mt-3">
                        <label htmlFor="locInput" className="form-label">
                          Postcode
                        </label>

                        <div className="position-relative">
                          <input
                            type="text"
                            name="title"
                            className={`form-control ${
                              locInvalid ? "is-invalid" : ""
                            }`}
                            id="locInput"
                            disabled={loading || postalLoading}
                            onChange={async (
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setLocValue(event.target.value);
                              validateLoc(event.target.value);
                              validSearchPostal(event.target.value);
                            }}
                          />
                          {postalLoading && (
                            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center highlight">
                              <div
                                className="spinner-border spinner-border-sm position-absolute"
                                role="status"
                              />
                            </div>
                          )}
                        </div>
                        <div
                          className={`invalid-feedback ${
                            locInvalid && "d-block"
                          }`}
                        >
                          <i className="bi bi-exclamation-triangle"></i>{" "}
                          Ongeldige postcode.
                        </div>
                        <div className={"valid-feedback d-block"}>
                          <i
                            className={`bi ${
                              !postalInvalid ? "bi-check-circle-fill" : ""
                            }`}
                          ></i>{" "}
                          <span className="text-muted mb-0 text-capitalize">
                            Plaats
                          </span>{" "}
                          <span className="mb-0 text-capitalize fw-bold text-dark">
                            {postalCity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 border border-2 mt-2 mb-3"></div>
                  <h4 className="fw-bold mb-0">Prijs</h4>
                  <div className="row">
                    <div className="col col-md-6">
                      <div className="mb-3 mt-3">
                        <label htmlFor="milInput" className="form-label">
                          Vraagprijs
                        </label>
                        <input
                          type="text"
                          name="title"
                          className={`form-control ${
                            priceInvalid ? "is-invalid" : ""
                          }`}
                          id="milInput"
                          disabled={loading}
                          onChange={async (
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setPriceValue(event.target.value);
                            validatePrice(event.target.value);
                          }}
                        />
                        <div
                          className={`invalid-feedback ${
                            priceInvalid && "d-block"
                          }`}
                        >
                          <i className="bi bi-exclamation-triangle"></i>{" "}
                          Ongeldige vraagprijs (vb. €4500,-).
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 border border-2 mt-4 mb-3"></div>
                  <div className="row d-flex justify-content-center">
                    <div className="col col-md-6">
                      <div className="position-relative text-center">
                        <button
                          type="submit"
                          className={`btn w-100 ${loading && "disabled"}`}
                        >
                          <span className={`${loading && "invisible"}`}>
                            Advertentie plaatsen
                          </span>
                        </button>
                        {loading && (
                          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white">
                            <div
                              className="spinner-border spinner-border-sm position-absolute"
                              role="status"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Sell;
