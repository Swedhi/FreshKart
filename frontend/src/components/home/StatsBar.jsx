export default function StatsBar() {

  const stats = [
    {
      value: "30+",
      label: "Fresh Products"
    },
    {
      value: "1000+",
      label: "Orders Delivered"
    },
    {
      value: "30 Min",
      label: "Fast Delivery"
    },
    {
      value: "4.8★",
      label: "Customer Rating"
    }
  ];

  return (

    <section className="bg-green-900 text-white py-12">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {stats.map((item) => (

            <div key={item.label}>

              <h2 className="text-4xl font-bold">
                {item.value}
              </h2>

              <p className="text-green-200 mt-2">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}