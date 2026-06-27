import {
  useEffect,
  useState
} from "react";

import Navbar from "../../layouts/Navbar";

import {
  getOrders
} from "../../api/orderApi";

import {
  getUserId
} from "../../utils/auth";

import {
  Link
} from "react-router-dom";

export default function OrdersPage() {

  const [orders,
    setOrders] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders =
    async () => {

      try {

        const userId =
          getUserId();

        const data =
          await getOrders(
            userId
          );

        setOrders(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        {loading ? (

          <div>
            Loading Orders...
          </div>

        ) : orders.length === 0 ? (

          <div className="bg-white p-8 rounded-2xl border">

            <h2 className="text-2xl font-bold">
              No Orders Found
            </h2>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map(
              (order) => (

                <div
                  key={order.id}
                  className="
                    bg-white
                    border
                    rounded-2xl
                    p-6
                  "
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h2 className="text-xl font-bold">

                        Order #
                        {order.id}

                      </h2>

                      <p className="text-gray-500">

                        {new Date(
                          order.orderDate
                        ).toLocaleString()}

                      </p>

                    </div>

                    <span
                      className="
                        bg-green-100
                        text-green-700
                        px-4
                        py-2
                        rounded-full
                        font-semibold
                      "
                    >
                      Completed
                    </span>

                  </div>

                  <hr className="my-4" />

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-2xl font-bold text-green-700">

                        ₹
                        {order.totalPrice}

                      </h3>

                    </div>

                    <Link
                      to={`/orders/${order.id}`}
                      className="
                        bg-green-600
                        text-white
                        px-5
                        py-2
                        rounded-xl
                      "
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </>
  );
}