export const formatStatus = (status, noStyle = false) => {
  switch (status) {
    case "WAITING_FOR_ACCEPT":
      return (
        <span className={`${!noStyle && "badge"}`}>Waiting for accept</span>
      );
    case "ACCEPTED":
      return <span className="badge badge-info">Accepted</span>;
    case "WAITING_FOR_PAYMENT":
      return <span className="badge">Waiting for payment</span>;
    case "PROCESSING":
      return <span className="badge badge-primary">Processing</span>;
    case "DELIVERED":
      return "Delivered";
    case "REFUNDED":
      return <span className="badge badge-warning">Cancelled</span>;
    case "CANCELLED":
      return <span className="badge badge-error">Cancelled</span>;
    case "COMPLETED":
      return <span className="badge badge-success">Completed</span>;
    default:
      return "Waiting for accept";
  }
};

export const formatSelectedServices = (services) => {
  const data = services;
  const selectedServices = [];
  if (data.type === 3) {
    Object.keys(data.options).forEach((title) => {
      if (data.options[title].length > 0) {
        data.options[title].forEach((rootItem) => {
          if (rootItem.multiple) {
            rootItem.multiFormData.forEach((multipleItem) => {
              if (multipleItem.selectedOptions?.length > 0) {
                multipleItem.selectedOptions?.forEach((item) => {
                  selectedServices.push(item.title);
                });
              }
              if (multipleItem.customOptions?.length > 0) {
                multipleItem.customOptions?.forEach((item) => {
                  selectedServices.push(item.title);
                });
              }
            });
          } else {
            rootItem.selectedOptions?.forEach((item) => {
              selectedServices.push(item.title);
            });
            rootItem.customOptions?.forEach((item) => {
              selectedServices.push(item.title);
            });
          }
        });
      }
    });
  }
  if (data.type === 2) {
    data.options.forEach((rootItem) => {
      if (rootItem.multiple) {
        rootItem.multiFormData.forEach((multipleItem) => {
          multipleItem.selectedOptions?.forEach((item) => {
            selectedServices.push(item.title);
          });
          multipleItem.customOptions?.forEach((item) => {
            selectedServices.push(item.title);
          });
        });
      } else {
        rootItem.selectedOptions?.forEach((item) => {
          selectedServices.push(item.title);
        });
        rootItem.customOptions?.forEach((item) => {
          selectedServices.push(item.title);
        });
      }
    });
  }
  if (data.type === 1) {
    data.options?.selectedOptions?.forEach((item) => {
      selectedServices.push(item.title);
    });
    data.options?.customOptions?.forEach((item) => {
      selectedServices.push(item.title);
    });
  }
  if (!data.type) {
    try {
      data.forEach((item) => {
        selectedServices.push(item.title);
      });
    } catch (error) {
      console.log(error);
    }
  }
  return selectedServices;
};

export const dutyFee = (fee, total) => {
  return Number(fee * total).toFixed(2);
};

export function getUrlExtension(url) {
  return url.split(/[#?]/)[0].split(".").pop().trim();
}

export const uploadFiles = async (files, type = "IMAGE") => {
  const token = localStorage.getItem("token");
  if (!files || !token) {
    return false;
  }
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  formData.append("type", type);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_DUTYPEDIA_API_URL}/admin/upload`,
      requestOptions
    );
    const data = await resp.json();
    const { files } = data;
    return files;
  } catch (error) {
    console.log(error);
    return false;
  }
};
