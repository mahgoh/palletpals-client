export async function processCSV(file) {
  try {
    const csv = await readCSV(file)
    const parsed = parseCSV(csv)

    return parsed
  } catch (e) {
    throw e
  }
}

function readCSV(file) {
  return new Promise((resolve, reject) => {
    if (file === null) reject('No file selected')

    // Check if the file is an image.
    if (file.type && !file.type === 'text/csv') {
      console.log('File is not csv.', file.type, file)
      reject('File is not csv.')
    }

    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      resolve(event.target.result)
    })
    reader.readAsText(file)
  })
}

/**
 *
 * Target:
 * {
 *   "km": [10,20,30],
 *   "pallets": [1,2,3],
 *   "price": [[5,6,7],[9,11,13],[15,17,19]]
 * }
 * @param {string} csv
 * @returns
 */

function parseCSV(csv) {
  const lines = csv.split('\n')

  // how entries are separated
  const delimiter = csv.includes(',') ? ',' : ';'

  const head = lines.shift()

  // palletArray is the first row except the first column
  // integers
  const palletArray = head
    .split(delimiter)
    .slice(1)
    .map((p) => parseInt(p))

  // kmArray is the first column except the first row
  // integers
  const kmArray = lines.map(
    (line) => line.split(delimiter).map((km) => parseInt(km))[0]
  )

  // priceMatrix is the rest of the table as two dimensional array
  // floats
  const priceMatrix = lines.map((line) =>
    line
      .split(delimiter)
      .slice(1)
      .map((p) => parseFloat(p))
  )

  return {
    kmArray,
    palletArray,
    priceMatrix,
  }
}
