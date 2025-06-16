import React from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useGetProductsQuery } from "../../store/services/api";
import TableSkeleton from "../shared/TableSkeleton";
import { tableTheme } from "../../helper/tableTheme";
ModuleRegistry.registerModules([AllCommunityModule]);
const ProductTable = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  console.log(products);

  const rowData = [
    {
      id: "YR9znF6Ji021q5QMlt1CX",
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: "300",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: {
        rate: "5",
        count: "100",
      },
      count: "100",
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, lightweight & soft fabric for breathable and comfortable wearing.",
    },
  ];

  const columnDefs = [
    { headerName: "ID", field: "id", flex: 1, pinned: "left", width: 70 },
    { headerName: "Title", field: "title", flex: 1 },
    { headerName: "Price", field: "price", flex: 0.5 },
    { headerName: "Category", field: "category", flex: 0.8 },
    {
      headerName: "Image",
      field: "image",
      cellRenderer: (params) => (
        <img
          src={params.value}
          alt="product"
          className="w-16 h-16 object-contain mx-auto"
        />
      ),
      flex: 0.6,
    },
    {
      headerName: "Rating",
      valueGetter: (params) => `${params.data.rating.rate} ⭐`,
      flex: 0.5,
    },
    {
      headerName: "Description",
      field: "description",
      flex: 1.5,
    },
  ];

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div style={{ height: 500 }}>
          <AgGridReact
            theme={tableTheme()}
            rowData={products}
            columnDefs={columnDefs}
          />
        </div>
      )}
    </>
  );
};

export default ProductTable;
