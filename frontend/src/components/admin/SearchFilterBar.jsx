import React from "react";

export default function SearchFilterBar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-xl px-4 py-3 w-full md:w-80"
      />

      <div className="flex gap-4">

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="All">
            All Categories
          </option>

          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">
            Sort
          </option>

          <option value="name">
            Name
          </option>

          <option value="priceLow">
            Price ↑
          </option>

          <option value="priceHigh">
            Price ↓
          </option>

        </select>

      </div>

    </div>
  );
}