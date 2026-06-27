export default function WhyChooseSection() {
  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      desc: "Get groceries delivered within minutes.",
    },
    {
      icon: "🥬",
      title: "Farm Fresh",
      desc: "Directly sourced from local farmers.",
    },
    {
      icon: "💳",
      title: "Secure Payments",
      desc: "100% safe and secure online transactions.",
    },
    {
      icon: "🏪",
      title: "Local Farmers",
      desc: "Supporting nearby farming communities.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose FreshKart?
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8 text-center"
          >
            <div className="text-5xl mb-4">
              {feature.icon}
            </div>

            <h3 className="text-xl font-bold mb-2">
              {feature.title}
            </h3>

            <p className="text-gray-600">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}