"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Product, Variant } from "../lib/products";

type Props = { product: Product };

export default function VariantSelector({ product }: Props) {
  const variants = useMemo(() => product.variants ?? [], [product.variants]);

  const sizes = useMemo(() => {
    if (product.sizes && product.sizes.length) return product.sizes;
    const s = Array.from(new Set(variants.map((v) => v.size).filter(Boolean) as string[]));
    return s.length ? s : [];
  }, [product.sizes, variants]);

  const colors = useMemo(() => {
    if (product.colors && product.colors.length) return product.colors;
    const c = Array.from(new Set(variants.map((v) => v.color).filter(Boolean) as string[]));
    return c.length ? c : [];
  }, [product.colors, variants]);

  const [selectedSize, setSelectedSize] = useState<string | undefined>(sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(colors[0]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (!variants.length) {
      setSelectedVariant(null);
      return;
    }
    // Prefer exact match size+color
    let v = variants.find((x) => x.size === selectedSize && x.color === selectedColor);
    if (!v && selectedColor) v = variants.find((x) => x.color === selectedColor);
    if (!v && selectedSize) v = variants.find((x) => x.size === selectedSize);
    if (!v) v = variants[0];
    setSelectedVariant(v ?? null);
  }, [variants, selectedSize, selectedColor]);

  function formatCurrency(n?: number | null) {
    if (n == null) return "";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
  }

  return (
    <div>
      <div className="flex gap-4 items-center">
        {sizes.length > 0 && (
          <div>
            <label className="block text-sm text-gray-600">Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}

        {colors.length > 0 && (
          <div>
            <label className="block text-sm text-gray-600">Color</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mt-4">
        {selectedVariant ? (
          <div>
            <div className="text-lg font-bold">
              {selectedVariant.salePrice && selectedVariant.salePrice < selectedVariant.price ? (
                <>
                  <span className="text-pink-600 mr-2">{formatCurrency(selectedVariant.salePrice)}</span>
                  <span className="line-through text-gray-500">{formatCurrency(selectedVariant.price)}</span>
                </>
              ) : (
                <span>{formatCurrency(selectedVariant.price)}</span>
              )}
            </div>
            <div className="text-sm text-gray-600 mt-2">SKU: {selectedVariant.id}</div>
            <div className="mt-4">
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded">
                Add to cart
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-600">No variant available</div>
        )}
      </div>
    </div>
  );
}
