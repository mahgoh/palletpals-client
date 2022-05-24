import { rest } from 'msw'

// Mock Data
import { products } from './fixtures/products'
import { user } from './fixtures/user'

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  rest.get('http://localhost/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products))
  }),
  rest.get('http://localhost/api/products/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products[0]))
  }),
  rest.get('http://localhost/api/user/profile', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user))
  }),
  rest.patch('http://localhost/api/user/profile', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user))
  }),
]
