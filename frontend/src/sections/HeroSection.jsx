import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

export default function HeroSection() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [productCount, setProductCount] = useState(0);
const [customerCount, setCustomerCount] = useState(0);
const [deliveryTime, setDeliveryTime] = useState(0);

  const handleSearch = () => {

    if (!search.trim()) {
      navigate("/products");
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(
        search
      )}`
    );
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      handleSearch();
    }

  };
  useEffect(() => {
  let p = 0;
  let c = 0;
  let d = 0;

  const interval = setInterval(() => {
    if (p < 30) p++;
    if (c < 500) c += 10;
    if (d < 30) d++;

    setProductCount(p);
    setCustomerCount(c);
    setDeliveryTime(d);

    if (p >= 30 && c >= 500 && d >= 30) {
      clearInterval(interval);
    }
  }, 40);

  return () => clearInterval(interval);
}, []);

  const quickCategories = [
    
    "Tomato",
    "Onion",
    "Milk",
    "Banana",
    "Atta",
  ];

  return (

    <section
      className="
        bg-gradient-to-br
        from-green-800
        via-green-700
        to-green-600
        text-white
      "
    >

      <div className="max-w-7xl mx-auto px-6 py-24 text-center">

        <div
          className="
            inline-flex
            items-center
            gap-2
            bg-green-900/40
            px-5
            py-2
            rounded-full
            mb-8
          "
        >

          <span
            className="
              w-3
              h-3
              bg-green-400
              rounded-full
              animate-pulse
            "
          />

          <span className="font-semibold">
            NOW DELIVERING IN LUCKNOW
          </span>

        </div>

        <h1
          className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
          "
        >
          Farm Fresh Groceries

          <br />

          at your door in

          <span className="text-yellow-300">
            {" "}30 Minutes
          </span>

        </h1>

        <p
          className="
            mt-8
            text-xl
            text-green-100
            max-w-3xl
            mx-auto
          "
        >
          Shop fresh vegetables, fruits,
          dairy products and grocery essentials
          delivered quickly from trusted sellers.
        </p>

        {/* SEARCH BAR */}

        <div
          className="
            max-w-3xl
            mx-auto
            mt-10
            flex
            bg-white
            rounded-full
            overflow-hidden
            shadow-xl
          "
        >

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Search vegetables, fruits, dairy..."
            className="
              flex-1
              px-6
              py-4
              text-black
              outline-none
            "
          />

          <button
            onClick={handleSearch}
            className="
              bg-green-600
              hover:bg-green-700
              px-8
              text-white
              font-semibold
            "
          >
            Search
          </button>

        </div>

        {/* QUICK SEARCH TAGS */}

        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-4
            mt-8
          "
        >

          {quickCategories.map(
            (item) => (

              <button
                key={item}
                onClick={() =>
                  navigate(
                    `/products?search=${item}`
                  )
                }
                className="
                  bg-green-700
                  hover:bg-green-800
                  px-4
                  py-2
                  rounded-full
                  transition
                "
              >
                {item === "Tomato" && "🍅 "}
                {item === "Onion" && "🧅 "}
                {item === "Milk" && "🥛 "}
                {item === "Banana" && "🍌 "}
                {item === "Atta" && "🌾 "}
                {item}
              </button>

            )
          )}

        </div>

        {/* STATS */}

        {/* STATS */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

  <div className="text-center">
    <h3 className="text-5xl font-extrabold text-white transition-all duration-300">
      {productCount}+
    </h3>

    <p className="text-green-100 mt-2 text-lg">
      Fresh Products
    </p>
  </div>

  <div className="text-center">
    <h3 className="text-5xl font-extrabold text-white transition-all duration-300">
      {customerCount}+
    </h3>

    <p className="text-green-100 mt-2 text-lg">
      Happy Customers
    </p>
  </div>

  <div className="text-center">
    <h3 className="text-5xl font-extrabold text-white transition-all duration-300">
      {deliveryTime} Min
    </h3>

    <p className="text-green-100 mt-2 text-lg">
      Average Delivery
    </p>
  </div>

</div>
      </div>

    </section>

  );

}