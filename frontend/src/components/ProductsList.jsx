import {
  useAddToCartMutation,
  useGetCartsByUserQuery,
  useGetProductsQuery,
  useUpdateCartItemMutation,
} from "../store/services/api";
import ProductCardSkeleton from "./shared/ProductCardSkeleton";
import { toast } from "react-toastify";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT = 3;

const ProductsList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: cartItems } = useGetCartsByUserQuery(user?.id);
  const [addToCart] = useAddToCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  // Pagination state
  const [start, setStart] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: products,
    isFetching,
    error,
  } = useGetProductsQuery({ start, limit: LIMIT });

  useEffect(() => {
    if (products && products.length > 0) {
      setProductsData((prev) => [...prev, ...products]);
    } else if (products?.length === 0) {
      setHasMore(false); // no more products
    }
  }, [products]);

  const fetchNextProducts = () => {
    if (!isFetching && hasMore) {
      setStart((prev) => prev + LIMIT);
    }
  };

  const handleAddToCart = async (product) => {
    const existingItem = cartItems?.find(
      (cart) => cart.productId === product.id
    );

    try {
      if (!existingItem) {
        await addToCart({
          id: nanoid(),
          userId: user.id,
          productId: product.id,
          quantity: 1,
        });
      } else {
        await updateCartItem({
          id: existingItem.id,
          quantity: existingItem.quantity + 1,
        });
      }
    } catch (err) {
      toast.error("You must be logged in first");
    }
  };

  return (
    <div className="bg-baby py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <h2 className="text-3xl font-bold text-khaki mb-6 text-center">
          Our Products
        </h2>

        {start === 0 && isFetching && <ProductCardSkeleton />}
        {error && (
          <p className="text-center text-2xl">Failed to load products!</p>
        )}

        <InfiniteScroll
          dataLength={productsData.length}
          next={fetchNextProducts}
          hasMore={hasMore}
          loader={<ProductCardSkeleton />}
          endMessage={
            <p className="text-center text-gray-600 mt-6">
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsData.map((product) => (
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
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange text-white px-4 py-2 rounded hover:bg-red transition"
                  >
                    Add to Cart
                  </button>
                  <button className="border border-orange text-orange px-4 py-2 rounded hover:bg-orange hover:text-white transition">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProductsList;
