export default function WhyChooseSection() {

  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      desc:
        "Fresh groceries delivered to your doorstep within minutes."
    },
    {
      icon: "🥬",
      title: "Farm Fresh",
      desc:
        "Directly sourced from trusted local farms."
    },
    {
      icon: "💳",
      title: "Secure Payments",
      desc:
        "Safe online transactions with multiple payment methods."
    },
    {
      icon: "🏪",
      title: "Trusted Vendors",
      desc:
        "Verified local stores and suppliers."
    }
  ];

  return (

    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">

          Why Choose FreshKart?

        </h2>

        <p className="text-center text-gray-500 mb-12">

          Fresh groceries, faster delivery, smarter shopping.

        </p>

        <div className="grid md:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="
                bg-gray-50
                rounded-3xl
                p-8
                text-center
                hover:shadow-xl
                transition
              "
            >

              <div className="text-6xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">

                {feature.title}

              </h3>

              <p className="text-gray-600">

                {feature.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}