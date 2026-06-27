import Navbar from "../../layouts/Navbar";

import {
  useWishlist
} from "../../context/WishlistContext";

import ProductCard
from "../../components/product/ProductCard";

export default function WishlistPage() {

  const {
    wishlistItems
  } = useWishlist();

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-8">
          Wishlist
        </h1>

        {wishlistItems.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-2xl">
              No Wishlist Items
            </h2>

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-6
            "
          >

            {wishlistItems.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </div>

        )}

      </div>
    </>
  );
}