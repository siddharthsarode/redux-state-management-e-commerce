import React from "react";

const products = [
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing...",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions like hiking, cycling, etc...",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
];

const ProductsList = () => {
  return (
    <div className="bg-baby py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <h2 className="text-3xl font-bold text-khaki mb-6 text-center">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-contain mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold text-khaki mb-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {product.description}
              </p>
              <div className="text-orange font-bold text-lg mb-2">
                ${product.price}
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  Rating: ⭐ {product.rating.rate} ({product.rating.count})
                </span>
                <span className="bg-mindaro text-xs px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="flex space-x-3">
                <button className="bg-orange text-white px-4 py-2 rounded hover:bg-red transition">
                  Add to Cart
                </button>
                <button className="border border-orange text-orange px-4 py-2 rounded hover:bg-orange hover:text-white transition">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
