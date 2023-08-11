function getProductsImage(product, size) {
  let image = product?.image_groups?.find((res) => res.view_type === size)
    ?.images[0];

  return image;
}

function getProductPrice(product) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  });
  return formatter.format(product.price);
}

function getProductSize(product) {}
module.exports = { getProductsImage, getProductPrice };
