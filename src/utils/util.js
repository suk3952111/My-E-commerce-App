export const sortProducts = (products, sortOption) => {
  let sortedProducts = [...products];

  if (sortOption === "price-lowtohigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-hightolow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "rating") {
    sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  } else if (sortOption === "review") {
    sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
  }

  return sortedProducts;
};
