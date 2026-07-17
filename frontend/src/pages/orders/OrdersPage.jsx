import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../layouts/Navbar";
import { getOrders } from "../../api/orderApi";
import { getUserId } from "../../utils/auth";

export default function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const userId = getUserId();

            const data = await getOrders(userId);
            console.log("Orders API:", data);

            console.log("Orders Response:", data);

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

            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold mb-8">
                    My Orders
                </h1>

                {loading ? (

                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-14 w-14 border-4 border-green-600 border-t-transparent"></div>
                    </div>

                ) : orders.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow p-12 text-center">

                        <h2 className="text-2xl font-bold mb-2">
                            No Orders Yet
                        </h2>

                        <p className="text-gray-500">
                            Start shopping to place your first order.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="bg-white rounded-2xl shadow border p-6 hover:shadow-lg transition"
                            >

                                <div className="flex justify-between items-center">

                                    <div>

                                        <h2 className="text-xl font-bold">
                                            Order #{order.id}
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            {new Date(order.orderDate).toLocaleString()}
                                        </p>

                                    </div>

                                    <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                                        Pending
                                    </span>

                                </div>

                                <hr className="my-5" />

                                <div className="flex items-center justify-between flex-wrap gap-4">

                                    <div>

                                        <p className="text-gray-500">
                                            Total Amount
                                        </p>

                                        <h3 className="text-3xl font-bold text-green-600">
                                            ₹{order.totalPrice}
                                        </h3>

                                    </div>

                                    <div className="flex gap-3">

                                        <Link
                                            to={`/orders/${order.id}`}
                                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
                                        >
                                            View Details
                                        </Link>

                                        <Link
                                            to={`/tracking/${order.id}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
                                        >
                                            📦 Track Order
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </>
    );
}