import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Login from "../pages/Login";
import RegisterForm from "../pages/Register";
import PublicRoute from "./PublicRoute";
import AdminLayout from "../pages/admin/Layout";
import Dashboard from "../pages/admin/pages/Dashboard";
import App from "../App";
import AdminRoute from "./AdminRoute";
import AddProductForm from "../components/admin/AddProduct";
import ProductCRUD from "../components/admin/ProductCRUD";
import ProductTable from "../components/admin/ProductTable";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterForm />
            </PublicRoute>
          }
        />
      </Route>

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route
          index
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path="products" element={<ProductCRUD />}>
          <Route index element={<ProductTable />} />
          <Route path="addProduct" element={<AddProductForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
