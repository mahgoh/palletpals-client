export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function productImageURL(imageId) {
  return `${GLOBAL.API_URL}/product-images/${imageId}`
}

export function parseDateTime(dateTimeString, locale = 'en') {
  const datetime = new Date(dateTimeString)
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  }

  return datetime.toLocaleString(locale, options)
}

export function formatPrice(price) {
  return `CHF ${price.toFixed(2)}`
}

export function formatOrderId(id) {
  return id.toString().padStart(6, '0')
}
