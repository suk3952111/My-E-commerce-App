export const fetchProducts = () => {
  return fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((result) => result);
};

export const fetchCategories = () => {
  return fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((result) => result);
};

export const fetchProduct = (productSlug) => {
  return fetch(`https://fakestoreapi.com/products/${productSlug}`)
    .then((res) => res.json())
    .then((result) => result);
};
