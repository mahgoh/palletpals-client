import { rest } from 'msw'

// Mock Data
import { products } from './fixtures/products'

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products))
  }),
]
