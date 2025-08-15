import { fetchProducts } from "../../../lib/products";
import VariantSelector from "../../../components/VariantSelector";
import Image from "next/image";

type Props = { params: { id: string } };

export default async function ProductPage(props: Props) {
  const { id } = props.params;
  const products = await fetchProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto border rounded-lg p-6">
        <div className="flex gap-6 flex-col md:flex-row">
          <div>
            <Image src={product.imageUrl ?? "/file.svg"} alt={product.name} width={240} height={240} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <div className="mt-4">
              {/* VariantSelector is a client component */}
              <VariantSelector product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
