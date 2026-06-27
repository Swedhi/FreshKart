export default function CategoriesSection() {
  const categories = [
    "Vegetable",
    "Fruit",
    "Dairy",
    "Grains",
  ];

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">

      <h2 className="text-4xl font-bold mb-10">
        Shop by Category
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {categories.map((category) => (
          <div
            key={category}
            className="bg-white rounded-xl shadow p-8 text-center hover:shadow-xl cursor-pointer"
          >
            <h3 className="text-2xl font-semibold">
              {category}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
}