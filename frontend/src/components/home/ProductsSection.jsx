import { useEffect, useState } from "react";
import client from "../../api/client";
import ProductCard from "../product/ProductCard";

export default function ProductsSection() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    client
      .get("/products")
      .then((response) => {

        setProducts(
          response.data
        );

        setLoading(false);

      })
      .catch((error) => {

        console.error(error);

        setLoading(false);

      });

  }, []);

  if (loading) {

    return (
      <div className="text-center py-10">
        Loading Products...
      </div>
    );

  }

  return (
    <div className="max-w-7xl mx-auto px-6 mt-16">

      <h2 className="text-3xl font-bold mb-8">
        Best Sellers
      </h2>

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-6
        "
      >

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </div>
  );
}