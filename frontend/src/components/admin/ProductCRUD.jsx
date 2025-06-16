import React from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";

const ProductCRUD = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-3xl font-bold text-khaki mb-6 text-center">
        Manage Products
      </h2>

      <nav className="flex justify-end items-center gap-5">
        <button
          type="submit"
          onClick={() => navigate("addProduct")}
          className="flex items-center cursor-pointer justify-center gap-1 bg-orange text-white px-6 py-2 rounded hover:bg-red transition"
        >
          <MdOutlinePostAdd />
          Add Product
        </button>
      </nav>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProductCRUD;
