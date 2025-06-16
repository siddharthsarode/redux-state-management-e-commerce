import { themeQuartz } from "ag-grid-community";

export const tableTheme = () => {
  return themeQuartz.withParams({
    spacing: 15,
    // foregroundColor: "rgb(236, 237, 238)",
    // backgroundColor: "rgb(27, 28, 28)",
    headerBackgroundColor: "#cbe896ff",
    // rowHoverColor: "rgb(40, 39, 39)",
  });
};
