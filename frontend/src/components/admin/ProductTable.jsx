import React, { useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../store/services/api";
import TableSkeleton from "../shared/TableSkeleton";
import { tableTheme } from "../../helper/tableTheme";
ModuleRegistry.registerModules([AllCommunityModule]);
const ProductTable = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  console.log(products);

  // below line write because  redux query return a readOnly state we cannot be mutate that state. I have need to mutate rowData
  const rowData = products?.map((product) => ({ ...product }));

  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
      valueGetter: (param) => param.node.rowIndex + 1,
      width: 70,
    },
    { headerName: "Title", field: "title", width: 200 },
    { headerName: "Price", field: "price", width: 100 },
    { headerName: "Category", field: "category", width: 150 },
    {
      headerName: "Image",
      width: 100,
      field: "image",
      cellRenderer: (params) => (
        <img
          src={params.value}
          alt="product"
          className="w-16 h-16 object-contain mx-auto"
        />
      ),
    },
    {
      headerName: "Rating",
      width: 120,
      valueGetter: (params) => `${params.data.rating.rate} ⭐`,
    },
    {
      headerName: "Description",
      field: "description",
      width: 250,
    },
    {
      headerName: "Actions",
      pinned: "right",
      width: 150,
      editable: false,
      filter: false,
      cellRenderer: (param) => (
        <button
          onClick={() => deleteProduct(param.data.id)}
          className="bg-red px-5 w-fit h-fit text-white cursor-pointer"
        >
          Delete
        </button>
      ),
    },
  ];

  const handleProductUpdate = async (param) => {
    try {
      await updateProduct(param.data).unwrap();
      toast.success("Product updated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="h-[70vh]">
          <AgGridReact
            theme={tableTheme()}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ editable: true }}
            onCellValueChanged={handleProductUpdate}
          />
        </div>
      )}
    </>
  );
};

export default ProductTable;
