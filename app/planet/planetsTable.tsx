"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Table from "../components/table/table";
import { EditableField, Planet } from "./types";
import {
  CellEditRequestEvent,
  CellEditingStoppedEvent,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
} from "@ag-grid-community/core";
import { getTypedKeys } from "../utils/getTypedKeys";
import { findNextEditableCell, getColProps } from "./helpers";

import styles from "./styles.module.css";
import { InfoBox } from "./infoBox";
import { useKeyPressed } from "../hooks/useKeyPressed";

export const HIDDEN_KEYS: (keyof Planet)[] = [
  "residents",
  "films",
  "created",
  "edited",
  "url",
];

export function PlanetsTable({ planets }: { planets: Planet[] }) {
  const [rows, setRows] = useState(planets);
  const shiftPressed = useKeyPressed("Shift"); // for listening to shift+click behaviour

  const gridRef = useRef<GridApi<Planet>>();
  const columns = useMemo(() => {
    const keys = getTypedKeys(planets[0]);

    return keys
      .filter((field) => !HIDDEN_KEYS.includes(field))
      .map((field) => getColProps(field));
  }, [planets]);

  const onGridReady = useCallback((event: GridReadyEvent) => {
    gridRef.current = event.api;
  }, []);

  const getRowId = useCallback(
    ({ data }: GetRowIdParams<Planet>) => data.url,
    []
  );

  const onCellEditingStopped = useCallback(
    (event: CellEditingStoppedEvent) => {
      if (gridRef.current && event.oldValue !== event.newValue) {
        const nextCell = findNextEditableCell(Number(event.rowIndex), rows);

        if (nextCell) {
          const [rowIndex, colKey] = nextCell;

          gridRef.current.startEditingCell({ rowIndex, colKey });
        }
      }
    },
    [rows]
  );

  const onCellEditRequest = useCallback(
    (event: CellEditRequestEvent<Planet, string>) => {
      if (gridRef.current && event.rowIndex) {
        const index = event.rowIndex;
        const field = event.colDef.field as keyof Planet;
        const now = new Date().getUTCMilliseconds();

        // Set local unique identifier for new row
        const rowCopy = { ...event.data };
        rowCopy.url = `https://swapi.dev/api/planets/${now}`;

        const editableCell = { ...(rowCopy[field] as EditableField<string>) };
        editableCell.active = event.newValue || "";

        if (shiftPressed) {
          (rowCopy[field] as EditableField<string>) = editableCell;

          setRows((rows) => [...rows, rowCopy]);
        } else {
          editableCell.previous = event.oldValue || undefined;
          editableCell.lastEdited = now;

          (rowCopy[field] as EditableField<string>) = editableCell;

          setRows((rows) => {
            const newRows = [...rows];
            newRows[index] = rowCopy;
            return newRows;
          });
        }
      }
    },
    [shiftPressed]
  );

  return (
    <section className={styles.planetsTable}>
      <div>
        <h3 className={styles.title}>Star Wars: Planets API!</h3>
      </div>
      <div>
        <Table<Planet>
          readOnlyEdit
          rowData={rows}
          columnDefs={columns}
          onGridReady={onGridReady}
          onCellEditRequest={onCellEditRequest}
          onCellEditingStopped={onCellEditingStopped}
          getRowId={getRowId}
        />
      </div>
      <div>
        <InfoBox />
      </div>
    </section>
  );
}
