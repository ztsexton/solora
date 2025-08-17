import React from 'react'
import { render, screen } from '@testing-library/react'
import VariantSelector from './VariantSelector'
import { fetchProducts } from '../lib/products'

describe('VariantSelector', () => {
  test('displays sale price and crossed out normal price for variant on sale', async () => {
    const products = await fetchProducts()
    const pearl = products.find((p) => p.name.includes('Pearl'))!
    render(<VariantSelector product={pearl} />)

    // The default selected variant should be the first size/color combination which in mock has a salePrice
    // Expect sale price present
    expect(await screen.findByText(/\$24\.99/)).toBeInTheDocument()
    // Expect normal price crossed out
    const normal = screen.getByText(/\$29\.99/)
    expect(normal).toHaveClass('line-through')
  })
})
