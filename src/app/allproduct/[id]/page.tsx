"use client";

import { client } from "@/sanity/lib/client";
import ProductDetail from "@/components/Productdetail";

export const dynamic = "force-dynamic"; // Ensures the page is dynamic

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const query = `
  *[_type == "product" && _id == $id][0]{
    _id,
    productName,
    "imageUrl": image.asset->url,
    colors,
    price,
    description
  }
  `;

  const product = await client.fetch(query, { id: params.id });
  console.log(product);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetail product={product} />;
}

