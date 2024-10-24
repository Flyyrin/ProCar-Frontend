import Helmet from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import axiosInstance from "../components/AxiosInstance";
import { useState } from "react";
import "../styles/ImageBox.css";

function Sell() {
  const [apiError, setApiError] = useState(false);
  const [invalidFileSize, setInvalidFileSize] = useState(false);
  const [invalidFileType, setInvalidFileType] = useState(false);

  const handleUploadBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
                <form noValidate>
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
                      <div className="imageBox">
                        <div className="mainContainer">
                          <div className="innerContainer">
                            <input
                              name="image1"
                              type="file"
                              accept=".jpg, .jpeg, .png"
                              onChange={handleFileChange}
                              hidden
                            />
                            <div className="uploadBox main">
                              <div
                                className="uploadBoxHitbox"
                                onClick={handleUploadBoxClick}
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
                                />
                                <div className="uploadBox">
                                  <div
                                    className="uploadBoxHitbox"
                                    onClick={handleUploadBoxClick}
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
                                />
                                <div className="uploadBox">
                                  <div
                                    className="uploadBoxHitbox"
                                    onClick={handleUploadBoxClick}
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
                                />
                                <div className="uploadBox">
                                  <div
                                    className="uploadBoxHitbox"
                                    onClick={handleUploadBoxClick}
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
                                />
                                <div className="uploadBox">
                                  <div
                                    className="uploadBoxHitbox"
                                    onClick={handleUploadBoxClick}
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
