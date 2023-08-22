function getProductsImage(product, size) {
  let image = product?.image_groups?.find((res) => res.view_type === size)
    ?.images[0];

  return image;
}

function getProductPrice(price, currency) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(price);
}

function getFormatDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // month is zero-based
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formatted = yyyy + "-" + mm + "-" + dd;
  return formatted;
}

function getBreadcrumbs(req, res, next) {
  const urls = req.originalUrl.split("/");

  res.breadcrumbs = urls.map((url, i) => {
    url = url.includes("-") ? url.split("-").join(" ") : url;

    return {
      breadcrumbName:
        url === "" ? "Home" : url.charAt(0).toUpperCase() + url.slice(1),
      breadcrumbUrl: url === "" ? "/" : `${urls.slice(0, i + 1).join("/")}`,
      active: i === urls.length - 1,
    };
  });
  next();
}
class Api_error extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

module.exports = { Api_error };
module.exports = {
  getProductsImage,
  getProductPrice,
  getFormatDate,
  getBreadcrumbs,
  Api_error,
};
