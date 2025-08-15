// src/lib/products.ts

export type Variant = {
  id: string;               // unique id for the variant (SKU)
  size?: string;            // e.g. "S", "M", "L" or numeric size
  color?: string;           // e.g. "Crystal", "Sapphire"
  price: number;            // price for this specific size+color combo
  salePrice?: number | null;// optional sale price for this variant
  inventory?: number | null;// optional stock level
};

export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  // top-level price/salePrice are optional summaries for compatibility
  price?: number;           // optional: suggested/starting price (min variant price)
  salePrice?: number | null;
  colors?: string[];        // available colors (for convenience)
  sizes?: string[];         // available sizes (for convenience)
  category?: string;        // e.g., "Earrings"
  isNew: boolean;
  popularity?: number;      // higher = more popular
  variants?: Variant[];     // explicit size+color combos with per-variant pricing
};

export async function fetchProducts(): Promise<Product[]> {
  // Mock data for now
  return [
    {
      id: '1',
      name: 'Crystal Necklace',
      description: 'A beautiful crystal necklace.',
      isNew: true,
      // convenience lists
      colors: ['Crystal', 'Sapphire'],
      sizes: ['16in', '18in'],
      // variants: each size+color combo has its own price
      variants: [
        { id: '1-16-Crystal', size: '16in', color: 'Crystal', price: 49.99, salePrice: null, inventory: 12 },
        { id: '1-18-Crystal', size: '18in', color: 'Crystal', price: 54.99, salePrice: 44.99, inventory: 8 },
        { id: '1-16-Sapphire', size: '16in', color: 'Sapphire', price: 59.99, salePrice: 49.99, inventory: 5 },
        { id: '1-18-Sapphire', size: '18in', color: 'Sapphire', price: 64.99, salePrice: null, inventory: 2 },
      ],
      // top-level price = lowest variant price (optional convenience)
      price: 49.99,
      salePrice: null,
    },
    {
      id: '2',
      name: 'Pearl Earrings',
      description: 'Elegant pearl earrings.',
      isNew: false,
      colors: ['White', 'Ivory'],
      sizes: ['One Size'],
      variants: [
        { id: '2-OS-White', size: 'One Size', color: 'White', price: 29.99, salePrice: 24.99, inventory: 20 },
        { id: '2-OS-Ivory', size: 'One Size', color: 'Ivory', price: 31.99, salePrice: null, inventory: 15 },
      ],
      price: 29.99,
      salePrice: 24.99,
    },
    {
      id: '3',
      name: 'Rhinestone Bracelet',
      description: 'A stunning rhinestone bracelet.',
      isNew: false,
      colors: ['Silver', 'Gold'],
      sizes: ['Small', 'Medium', 'Large'],
      variants: [
        { id: '3-S-Silver', size: 'Small', color: 'Silver', price: 39.99, salePrice: null, inventory: 10 },
        { id: '3-M-Silver', size: 'Medium', color: 'Silver', price: 41.99, salePrice: null, inventory: 6 },
        { id: '3-L-Silver', size: 'Large', color: 'Silver', price: 43.99, salePrice: 34.99, inventory: 2 },
        { id: '3-S-Gold', size: 'Small', color: 'Gold', price: 44.99, salePrice: null, inventory: 4 },
      ],
      price: 39.99,
      salePrice: null,
    },
  ];
}
