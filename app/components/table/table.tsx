"use client";

import { AgGridReact, AgGridReactProps } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
// import styles from "./table.module.css";

const containerStyle = { width: "100%", height: "500px" };
const gridStyle = { height: "100%", width: "100%" };

export default function Table<T>({ rowData, columnDefs, ...rest }: AgGridReactProps<T>) {
  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", boxSizing: "border-box" }}>
        <div style={gridStyle} className={"ag-theme-quartz-dark"}>
          <AgGridReact<T>
            rowData={rowData}
            columnDefs={columnDefs}
            modules={[ClientSideRowModelModule]}
            {...rest}
          />
        </div>
      </div>
    </div>
  );
}
