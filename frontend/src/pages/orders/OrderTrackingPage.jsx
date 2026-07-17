import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../layouts/Navbar";
import { getOrderTracking } from "../../api/trackingApi";

import {
    Package,
    CheckCircle,
    Truck,
    MapPin,
    Phone,
    Clock
} from "lucide-react";

export default function OrderTrackingPage() {

    const { orderId } = useParams();

    const [tracking, setTracking] = useState(null);

    useEffect(() => {

    console.log("Order ID:", orderId);

    if (orderId) {
        loadTracking();
    }

}, [orderId]);

    const loadTracking = async () => {

    if (!orderId) {
        console.log("orderId is undefined");
        return;
    }

    try {

        const data = await getOrderTracking(orderId);

        console.log(data);

        setTracking(data);

    } catch (err) {

        console.error(err);

    }

};
    if (!tracking) {

        return (
            <>
                <Navbar />
                <div className="text-center mt-20 text-xl">
                    Loading...
                </div>
            </>
        );

    }

    const steps = [

        "Pending",

        "Confirmed",

        "Packed",

        "Out For Delivery",

        "Delivered"

    ];

    const activeStep = steps.indexOf(tracking.status);

    return (

        <>
            <Navbar />

            <div className="max-w-5xl mx-auto py-10 px-6">

                <h1 className="text-4xl font-bold mb-10 text-green-700">

                    Track Order

                </h1>

                <div className="bg-white rounded-3xl shadow-xl p-8">

                    <div className="flex justify-between items-center mb-10">

                        <div>

                            <h2 className="text-2xl font-bold">

                                Order #{tracking.orderId}

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Current Status

                            </p>

                            <span className="inline-block mt-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                                {tracking.status}

                            </span>

                        </div>

                        <Package
                            size={70}
                            className="text-green-600"
                        />

                    </div>

                    <div className="flex justify-between items-center mb-12">

                        {steps.map((step, index) => (

                            <div
                                key={step}
                                className="flex-1 flex flex-col items-center relative"
                            >

                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                                        index <= activeStep
                                            ? "bg-green-600"
                                            : "bg-gray-300"
                                    }`}
                                >

                                    {index < activeStep ? (
                                        <CheckCircle size={22} />
                                    ) : (
                                        index + 1
                                    )}

                                </div>

                                <p className="mt-3 text-center text-sm font-medium">

                                    {step}

                                </p>

                                {index !== steps.length - 1 && (

                                    <div
                                        className={`absolute top-6 left-1/2 w-full h-1 ${
                                            index < activeStep
                                                ? "bg-green-600"
                                                : "bg-gray-300"
                                        }`}
                                    />

                                )}

                            </div>

                        ))}

                    </div>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-green-50 rounded-2xl p-6">

                            <Clock className="text-green-600 mb-3" />

                            <h3 className="font-bold text-lg">

                                Estimated Delivery

                            </h3>

                            <p className="mt-2">

                                {tracking.estimatedDelivery}

                            </p>

                        </div>

                        <div className="bg-blue-50 rounded-2xl p-6">

                            <Truck className="text-blue-600 mb-3" />

                            <h3 className="font-bold text-lg">

                                Delivery Partner

                            </h3>

                            <p className="mt-2">

                                {tracking.deliveryPartner}

                            </p>

                        </div>

                        <div className="bg-orange-50 rounded-2xl p-6">

                            <Phone className="text-orange-600 mb-3" />

                            <h3 className="font-bold text-lg">

                                Contact

                            </h3>

                            <a
                                href={`tel:${tracking.phone}`}
                                className="text-blue-600 font-semibold"
                            >

                                {tracking.phone}

                            </a>

                        </div>

                    </div>

                    <div className="mt-10 bg-gray-50 rounded-2xl p-6">

                        <div className="flex items-center gap-3">

                            <MapPin className="text-red-500" />

                            <div>

                                <h3 className="font-bold">

                                    Delivery Address

                                </h3>

                                <p className="text-gray-600">

                                    Your selected delivery address

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}