import React from "react";
import { useGetProductsQuery } from "../store/services/api";
import ProductsList from "../components/ProductsList";

const Home = () => {
  const products = useGetProductsQuery();
  console.log(products);
  return (
    <>
      <ProductsList />
    </>
  );
};

export default Home;
