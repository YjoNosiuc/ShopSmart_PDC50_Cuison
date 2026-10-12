export function sortProducts(products, sortOrder) {
  const sorted = [...products];

  if (sortOrder === 'price-asc') {
    sorted.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortOrder === 'price-desc') {
    sorted.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortOrder === 'name-asc') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sorted;
}
