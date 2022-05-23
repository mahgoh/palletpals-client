export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function productImageURL(imageId) {
  return `${GLOBAL.API_URL}/product-images/${imageId}`
}
