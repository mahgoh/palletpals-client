export interface Product {
  id: number
  name: string
  details: string
  description: string
  price: number
  maxProducts: number
  minPalletSpace: number
  productImages: ProductImage[]
}

interface ProductImage {
  id: number
  fileName: string
  fileUrl: string
  fileType: string
}

export const products: Product[] = [
  {
    id: 4,
    name: 'Product A',
    details: 'Interesting details',
    description: 'Wonderful description',
    price: 16.7,
    maxProducts: 20.0,
    minPalletSpace: 5.0,
    productImages: [
      {
        id: 2,
        fileName: 'Iels0FrFFGYoKhgOGDeD.png',
        fileUrl: 'uploads\\Iels0FrFFGYoKhgOGDeD.png',
        fileType: 'image/png',
      },
      {
        id: 3,
        fileName: 'Ncu4XigN358N933ssIUS.png',
        fileUrl: 'uploads\\Ncu4XigN358N933ssIUS.png',
        fileType: 'image/png',
      },
    ],
  },
]
