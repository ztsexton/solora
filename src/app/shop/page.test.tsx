import React from 'react'
import { render, screen } from '@testing-library/react'
import Shop from './page'
import { fetchProducts } from '../../lib/products'

describe('Shop page', () => {
  test('shows price range from lowest variant (including sales) to highest variant', async () => {
    // render the async server component
    const element = await Shop({ searchParams: {} })
    render(element as React.ReactElement)

    // product with id '1' should display min sale 44.99 and max 64.99
    expect(await screen.findByText(/\$44\.99\s*-\s*\$64\.99/)).toBeInTheDocument()
  })

  test('product cards show an image with alt text and placeholder when missing', async () => {
    const element = await Shop({ searchParams: {} })
    render(element as React.ReactElement)

    // each product should have an img; check first product
    const imgs = await screen.findAllByRole('img')
    expect(imgs.length).toBeGreaterThan(0)

    // alt should contain product name for at least one img
    const products = await fetchProducts()
    const first = products[0]
    const img = imgs.find((i) => i.getAttribute('alt') === first.name)
    expect(img).toBeTruthy()

    // placeholder: since top-level imageUrl defaults to '/file.svg', ensure at least one img uses that
    const hasPlaceholder = imgs.some((i) => i.getAttribute('src') === '/file.svg')
    expect(hasPlaceholder).toBe(true)
  })

  test('product card links navigate to product page (href set)', async () => {
    const element = await Shop({ searchParams: {} })
    render(element as React.ReactElement)

    const products = await fetchProducts()
    const first = products[0]
  // find anchor with href /shop/1 (the link's accessible name includes image/desc/price,
  // so match by regexp substring)
  const anchor = screen.getByRole('link', { name: new RegExp(first.name) })
    expect(anchor).toHaveAttribute('href', `/shop/${first.id}`)
  })
})
