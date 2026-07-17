import { useEffect, useState } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import Navbar from "../../layouts/Navbar";
import ProductCard from "../../components/product/ProductCard";
import { getCategories } from "../../api/categoryApi";

import axios from "axios";

export default function ProductsPage() {

  const navigate = useNavigate();
  const [searchParams] =
    useSearchParams();

  const [products,
    setProducts] =
    useState([]);

  const [search,
    setSearch] =
    useState(
      searchParams.get("search") || ""
    );

  const [selectedCategory,
    setSelectedCategory] =
    useState(
      searchParams.get("category") || "All"
    );

  const [currentPage,
    setCurrentPage] =
    useState(1);

  const productsPerPage = 8;
  

  const [categories, setCategories] = useState([
  {
    id: 0,
    name: "All",
  },
]);

  useEffect(() => {
  loadProducts();
  loadCategories();
}, []);


  useEffect(() => {

    const searchValue =
      searchParams.get("search");

    const categoryValue =
      searchParams.get("category");

    if (searchValue !== null) {
      setSearch(searchValue);
    }

    if (categoryValue !== null) {
      setSelectedCategory(categoryValue);
    }

  }, [searchParams]);

  const loadProducts =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:8080/api/products"
          );

        setProducts(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };
    const loadCategories = async () => {
  try {
    const data = await getCategories();

    setCategories([
      {
        id: 0,
        name: "All",
      },
      ...data,
    ]);
  } catch (error) {
    console.error(error);
  }
};

  const filteredProducts =
    products.filter(
      (product) => {

        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          selectedCategory === "All"
            ? true
            : product.category ===
              selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );

  const lastProductIndex =
    currentPage *
    productsPerPage;

  const firstProductIndex =
    lastProductIndex -
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      firstProductIndex,
      lastProductIndex
    );

  const totalPages =
    Math.ceil(
      filteredProducts.length /
      productsPerPage
    );

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <div className="flex flex-col gap-6 mb-8">

          <h1 className="text-4xl font-bold">
            All Products
          </h1>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {

              setSearch(
                e.target.value
              );

              setCurrentPage(1);

            }}
            className="
              border
              rounded-xl
              px-4
              py-3
              w-full
              md:w-96
              outline-none
              focus:ring-2
              focus:ring-green-500
            "
          />

          <div className="flex flex-wrap gap-3">

            {categories.map(
              (category) => (

                <button
                  key={category.id}
                  onClick={() => {

                    setSelectedCategory(category.name);

                    setCurrentPage(1);

                    navigate(
  category.name === "All"
    ? "/products"
    : `/products?category=${category.name}`
);

                  }}
                  className={`
                    px-5
                    py-2
                    rounded-full
                    font-medium
                    transition
                    ${
                      selectedCategory === category.name
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }
                  `}
                >
                  {category.name}
                </button>

              )
            )}

          </div>

        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            )
          )}

        </div>

        {totalPages > 1 && (

          <div className="flex justify-center items-center gap-3 mt-10">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
              className="
                px-4
                py-2
                bg-gray-200
                rounded-lg
                disabled:opacity-50
              "
            >
              Previous
            </button>

            {[...Array(totalPages)].map(
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(
                      index + 1
                    )
                  }
                  className={`
                    w-10
                    h-10
                    rounded-lg
                    ${
                      currentPage === index + 1
                        ? "bg-green-600 text-white"
                        : "bg-gray-100"
                    }
                  `}
                >
                  {index + 1}
                </button>

              )
            )}

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
              className="
                px-4
                py-2
                bg-gray-200
                rounded-lg
                disabled:opacity-50
              "
            >
              Next
            </button>

          </div>

        )}

      </div>
    </>
  );
}