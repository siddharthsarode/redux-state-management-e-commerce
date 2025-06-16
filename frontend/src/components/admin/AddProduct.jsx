import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../store/services/api";
import { toast } from "react-toastify";
import { nanoid } from "@reduxjs/toolkit";

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [addProduct, { data, error, isError, isLoading, isSuccess }] =
    useAddProductMutation();

  const onSubmit = async (data) => {
    try {
      const modifyData = {
        ...data,
        id: nanoid(),
        rating: { rate: data.rating, count: data.count },
      };
      const res = await addProduct(modifyData).unwrap();
      console.log(res);
      toast.success("Product Added");
      reset();
    } catch (error) {
      toast.error(error.error || "Product does not added!");
    }
  };

  return (
    <div className="bg-baby py-10 w-full md:w-[90%] mx-auto">
      <h2 className="text-3xl font-bold text-khaki mb-6 text-center">
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div>
          <label className="block text-khaki font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Product title"
            className="w-full border border-khaki rounded px-3 py-2 focus:outline-orange"
          />
          {errors.title && (
            <p className="text-red text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-khaki font-medium mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required" })}
            placeholder="Product price"
            className="w-full border border-khaki rounded px-3 py-2 focus:outline-orange"
          />
          {errors.price && (
            <p className="text-red text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-khaki font-medium mb-1">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border border-khaki rounded px-3 py-2 focus:outline-orange"
          >
            <option value="">Select category</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>
          {errors.category && (
            <p className="text-red text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-khaki font-medium mb-1">Image URL</label>
          <input
            type="text"
            {...register("image", { required: "Image URL is required" })}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-khaki rounded px-3 py-2 focus:outline-orange"
          />
          {errors.image && (
            <p className="text-red text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-khaki font-medium mb-1">Rating</label>
          <input
            type="number"
            step="0.1"
            max="5"
            min="0"
            {...register("rating", { required: "Rating is required" })}
            placeholder="4.5"
            className="w-full border border-khaki rounded px-3 py-2 focus:outline-orange"
          />
          {errors.rating && (
            <p className="text-red text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>

        {/* Rating Count */}
        <div>
          <label className="block text-khaki font-medium mb-1">
            Rating Count
          </label>
          <input
            type="number"
            {...register("count", { required: "Count is required" })}
            placeholder="e.g., 100"
            className="w-full border border-khaki rounded px-3 py-2 focus:outline-orange"
          />
          {errors.count && (
            <p className="text-red text-sm mt-1">{errors.count.message}</p>
          )}
        </div>

        {/* Description (full width) */}
        <div className="md:col-span-2">
          <label className="block text-khaki font-medium mb-1">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows="4"
            placeholder="Write product description..."
            className="w-full border border-khaki rounded px-3 py-2 focus:outline-orange"
          ></textarea>
          {errors.description && (
            <p className="text-red text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button (full width) */}
        <div className="md:col-span-2 flex items-center gap-3 text-center justify-center">
          <button
            type="submit"
            className="bg-orange cursor-pointer text-white px-6 py-2 rounded hover:bg-red transition"
          >
            {isLoading ? "Adding..." : "Add Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="bg-red cursor-pointer text-white px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
