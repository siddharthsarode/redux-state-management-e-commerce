import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useDeleteCartItemMutation,
  useGetCartsByUserQuery,
  useGetProductsQuery,
  useUpdateCartItemMutation,
} from "../store/services/api";

const Carts = () => {
  const { id: userId } = useSelector((state) => state.user.data);
  const { data: products } = useGetProductsQuery();
  const { data: cartItems } = useGetCartsByUserQuery(userId);
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const cartProducts =
    cartItems && products
      ? cartItems.map((cart) => {
          const product = products.find(
            (product) => product.id === cart.productId
          );
          return { ...product, quantity: cart.quantity, cartId: cart.id };
        })
      : [];

  // console.log("cartItems", cartProducts);

  // Handle increase/decrease quantity of cart items
  const handleChangeQuantity = async (cart, quantity) => {
    const newQuantity = cart.quantity + quantity;
    if (newQuantity < 1) return;
    try {
      await updateCartItem({
        id: cart.cartId,
        quantity: newQuantity,
      });
    } catch (err) {
      console.error("Failed to update cart item", err);
    }
  };

  const totalPrice = cartProducts
    ? cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="bg-baby min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange mb-6 text-center">
          Your Shopping Cart
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {cartProducts?.map((item) => (
            <div
              key={item.id}
              className="bg-baby rounded-lg shadow p-4 flex flex-col md:flex-row items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-contain"
              />

              <div className="flex-1 text-sm sm:text-base">
                <h3 className="font-semibold text-orange text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-700 mt-1">
                  {item.description?.slice(0, 80)}...
                </p>
                <p className="text-orange font-semibold mt-2">₹{item.price}</p>
                <p className="text-sm text-gray-600">
                  Rating: ⭐ {item.rating.rate} ({item.rating.count} reviews)
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleChangeQuantity(item, -1)}
                  className="bg-khaki text-white px-2 py-1 rounded hover:bg-orange"
                >
                  -
                </button>
                <span className="px-3 text-lg font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleChangeQuantity(item, 1)}
                  className="bg-khaki text-white px-2 py-1 rounded hover:bg-orange"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => deleteCartItem(item.cartId)}
                className="mt-2 md:mt-0 bg-red text-white px-4 py-1 rounded hover:bg-orange"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-khaki">
            Total: ₹{totalPrice.toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Carts;
