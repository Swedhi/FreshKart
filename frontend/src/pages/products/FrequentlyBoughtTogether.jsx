import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

import { getRecommendations } from "../../api/recommendationApi";
import { addCartItem } from "../../api/cartApi";
import { getUserId } from "../../utils/auth";
import { getProductImage } from "../../utils/productImages";

export default function FrequentlyBoughtTogether({ productId }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        loadRecommendations();

    }, [productId]);

    const loadRecommendations = async () => {

        try {

            const data = await getRecommendations(productId);

            setProducts(data);

        } catch (err) {

            console.log(err);

        }

    };

    const addToCart = async (id) => {

        try {

            await addCartItem(
                getUserId(),
                id,
                1
            );

            alert("Added to cart");

        } catch (err) {

            console.log(err);

            alert("Unable to add item");

        }

    };

    if (products.length === 0) return null;

    return (

        <div className="mt-16">

            <h2 className="text-3xl font-bold mb-8">

                Frequently Bought Together

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {products.map(product => (

                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4"
                    >

                        <img
                            src={
                                product.imageUrl ||
                                getProductImage(product.name)
                            }
                            alt={product.name}
                            className="h-40 w-full object-contain"
                        />

                        <h3 className="font-semibold mt-4">

                            {product.name}

                        </h3>

                        <p className="text-green-600 text-xl font-bold mt-2">

                            ₹{product.price}

                        </p>

                        <button
                            onClick={() => addToCart(product.id)}
                            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl flex justify-center items-center gap-2"
                        >

                            <ShoppingCart size={18} />

                            Add

                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}