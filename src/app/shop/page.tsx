import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { fetchProducts, Product } from "../../lib/products";

// ...existing code...

const CATEGORIES = ["Earrings", "Necklaces", "Bracelets", "Hair Accessories", "Rings", "Sets"] as const;
const COLORS = [
  "Crystal",
  "Crystal AB",
  "Jet",
  "Sapphire",
  "Emerald",
  "Fuchsia",
  "Topaz",
  "Aquamarine",
  "Rose",
  "Amethyst",
  "Peridot",
  "Hyacinth",
  "Capri Blue",
  "Gold",
] as const;

const SORTS = [
  { key: "new", label: "New in" },
  { key: "price-asc", label: "Price Low to High" },
  { key: "price-desc", label: "Price High to Low" },
  { key: "popular", label: "Popular" },
] as const;

function formatCurrency(n?: number | null) {
  if (n == null) return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function getPriceRange(p: Product) {
  const variants = p.variants ?? [];
  if (variants.length) {
    const min = Math.min(...variants.map((v) => (v.salePrice ?? v.price)));
    const max = Math.max(...variants.map((v) => v.price));
    if (min === max) return formatCurrency(min);
    return `${formatCurrency(min)} - ${formatCurrency(max)}`;
  }
  // fallback to top-level price
  const single = p.salePrice ?? p.price;
  return formatCurrency(single ?? undefined);
}

async function getProducts(): Promise<Product[]> {
 const products = await fetchProducts();
  // Light enrichment so the UI can render nicely if fields are missing
  return products.map((p, i) => ({
    ...p,
    imageUrl: p.imageUrl ?? "/file.svg",
    price: p.price ?? (30 + (i % 10) * 5),
    salePrice: p.salePrice ?? (i % 7 === 0 ? 0.9 * (30 + (i % 10) * 5) : null),
    colors: p.colors ?? [COLORS[i % COLORS.length]],
    category: p.category ?? CATEGORIES[i % CATEGORIES.length],
    isNew: p.isNew ?? i % 9 === 0,
    popularity: p.popularity ?? Math.floor(Math.random() * 1000),
  }));
}

function applyFilters(products: Product[], params: URLSearchParams) {
  const byCategory = params.getAll("category");
  const byColor = params.getAll("color");
  let list = products.slice();

  if (byCategory.length) {
    const set = new Set(byCategory.map((c) => c.toLowerCase()));
    list = list.filter((p) => p.category && set.has(p.category.toLowerCase()));
  }
  if (byColor.length) {
    const set = new Set(byColor.map((c) => c.toLowerCase()));
    list = list.filter((p) => p.colors?.some((c) => set.has(c.toLowerCase())));
  }

  const sort = params.get("sort") ?? "new";
  switch (sort) {
    case "price-asc":
      list.sort((a, b) => (a.salePrice ?? a.price ?? 0) - (b.salePrice ?? b.price ?? 0));
      break;
    case "price-desc":
      list.sort((a, b) => (b.salePrice ?? b.price ?? 0) - (a.salePrice ?? a.price ?? 0));
      break;
    case "popular":
      list.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
      break;
    case "new":
    default:
      list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  }

  return list;
}


function toggleParam(params: URLSearchParams, key: string, value: string) {
  const next = new URLSearchParams(params.toString());
  const values = next.getAll(key);
  const exists = values.includes(value);
  next.delete(key);
  const kept = exists ? values.filter((v) => v !== value) : [...values, value];
  kept.forEach((v) => next.append(key, v));
  return next;
}

function setParam(params: URLSearchParams, key: string, value: string) {
  const next = new URLSearchParams(params.toString());
  next.set(key, value);
  return next;
}

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Shop(props: Props) {
  const products = await getProducts();
  const { searchParams } = props;
    // const filtered = applyFilters(products, params);


    return (
        <div className="min-h-screen bg-white font-sans p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop Ballroom Jewelry</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="border rounded-lg p-6 flex flex-col items-center shadow hover:shadow-md transition"
              >
                <Image src={product.imageUrl ?? "/file.svg"} alt={product.name} width={80} height={80} />
                <h2 className="text-xl font-semibold mt-4 mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">Description for {product.name}.</p>
                <div className="text-lg font-bold text-gray-900">{getPriceRange(product)}</div>
              </Link>
            ))}
        </div>
        </div>
    );
}
