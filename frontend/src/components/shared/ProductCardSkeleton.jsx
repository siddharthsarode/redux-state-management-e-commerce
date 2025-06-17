import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 animate-pulse"
          >
            <div className="w-full h-64 bg-gray-300 rounded-md mb-4" />
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-full mb-2" />
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 bg-gray-300 rounded w-1/3" />
              <div className="h-4 bg-gray-300 rounded w-1/4" />
            </div>
            <div className="flex space-x-3">
              <div className="h-10 bg-gray-300 rounded w-1/2" />
              <div className="h-10 bg-gray-300 rounded w-1/2" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductCardSkeleton;
