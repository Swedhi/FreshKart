import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import Navbar from "../../layouts/Navbar";

import client from "../../api/client";

export default function OrderDetailPage() {

  const { id } =
    useParams();

  const [items,
    setItems] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    loadOrderItems();

  }, []);

  const loadOrderItems =
    async () => {

      try {

        const response =
          await client.get(
            `/orders/${id}/items`
          );

        setItems(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">

            Order #
            {id}

          </h1>

          <Link
            to="/orders"
            className="
              bg-gray-200
              px-5
              py-2
              rounded-xl
            "
          >
            Back
          </Link>

        </div>

        {loading ? (

          <div>
            Loading...
          </div>

        ) : items.length === 0 ? (

          <div
            className="
              bg-white
              border
              rounded-2xl
              p-8
            "
          >

            <h2 className="text-2xl font-bold">
              No Items Found
            </h2>

          </div>

        ) : (

          <div
            className="
              bg-white
              border
              rounded-2xl
              overflow-hidden
            "
          >

            <div
              className="
                grid
                grid-cols-4
                bg-gray-100
                p-4
                font-bold
              "
            >

              <div>
                Product
              </div>

              <div>
                Quantity
              </div>

              <div>
                Price
              </div>

              <div>
                Total
              </div>

            </div>

            {items.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="
                    grid
                    grid-cols-4
                    p-4
                    border-t
                  "
                >

                  <div>
                    {item.productName}
                  </div>

                  <div>
                    {item.quantity}
                  </div>

                  <div>
                    ₹{item.price}
                  </div>

                  <div>

                    ₹
                    {
                      item.price *
                      item.quantity
                    }

                  </div>

                </div>

              )
            )}

            <div
              className="
                border-t
                p-6
                text-right
              "
            >

              <h2 className="text-2xl font-bold text-green-700">

                ₹
                {items.reduce(
                  (
                    total,
                    item
                  ) =>
                    total +
                    item.price *
                    item.quantity,
                  0
                )}

              </h2>

            </div>

          </div>

        )}

      </div>

    </>
  );
}