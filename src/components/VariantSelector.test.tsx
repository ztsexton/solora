import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  test('updates displayed price and SKU when selecting different color/size', async () => {
    const products = await fetchProducts()
    const pearl = products.find((p) => p.name.includes('Pearl'))!
    render(<VariantSelector product={pearl} />)

    const user = userEvent.setup()

    // Initially sale price for White
    expect(await screen.findByText(/\$24\.99/)).toBeInTheDocument()

  // Change color to Ivory which has price 31.99 and no salePrice
  // labels are not associated with selects in the component, so pick the second combobox
  const selects = screen.getAllByRole('combobox')
  const colorSelect = selects[1] as HTMLSelectElement
  await user.selectOptions(colorSelect, 'Ivory')

    // Now expect the non-sale price to be shown and no line-through
    expect(await screen.findByText(/\$31\.99/)).toBeInTheDocument()
    const struck = screen.queryByText(/\$29\.99/)
    expect(struck).toBeNull()

    // SKU should show the selected variant id for Ivory
    expect(screen.getByText(/SKU:\s*2-OS-Ivory/)).toBeInTheDocument()
  })
})
