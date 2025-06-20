import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-baby min-h-screen">
      <h1 className="text-2xl font-semibold text-orange mb-6">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products Card */}
        <div className="bg-khaki text-deep p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Total Products</h2>
            <p className="text-3xl font-semibold text-red">128</p>
          </div>
          <button
            onClick={() => navigate("products")}
            className="mt-4 bg-orange text-white px-4 py-2 rounded hover:bg-red transition duration-200"
          >
            View Products
          </button>
        </div>

        {/* Users Card */}
        <div className="bg-mindaro text-deep p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Registered Users</h2>
            <p className="text-3xl font-semibold text-orange">320</p>
          </div>
          <button className="mt-4 bg-orange text-white px-4 py-2 rounded hover:bg-red transition duration-200">
            Manage Users
          </button>
        </div>

        {/* Orders Card */}
        <div className="bg-khaki text-deep p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">New Orders</h2>
            <p className="text-3xl font-semibold text-orange">56</p>
          </div>
          <button className="mt-4 bg-orange text-white px-4 py-2 rounded hover:bg-red transition duration-200">
            View Orders
          </button>
        </div>

        {/* Support Tickets Card */}
        <div className="bg-mindaro text-deep p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Support Tickets</h2>
            <p className="text-3xl font-semibold text-red">12</p>
          </div>
          <button className="mt-4 bg-orange text-white px-4 py-2 rounded hover:bg-red transition duration-200">
            Resolve Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
