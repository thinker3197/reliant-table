import {
  CellClassParams,
  ColDef,
  EditableCallbackParams,
  ICellEditorParams,
  ISelectCellEditorParams,
  ValueGetterParams,
  ValueSetterParams,
} from "@ag-grid-community/core";
import { EditableField, Planet } from "./types";
import { capitalize } from "../utils/capitalize";

const FIELD_CLEAN_BG = '#CC333344';
const FIELD_DIRTY_BG = '#2244CC44';

function getPinned(field: keyof Planet): ColDef<Planet>["pinned"] {
  const leftPinned: (keyof Planet)[] = ["name"];
  const rightPinned: (keyof Planet)[] = ["terrain"];

  if (leftPinned.includes(field)) {
    return "left";
  }

  if (rightPinned.includes(field)) {
    return "right";
  }

  return;
}

export function isEditableType(value: any): value is EditableField<string> {
  return (
    value && Array.isArray(value.alternatives) && value.alternatives.length > 0
  );
}

export function isEditableCell(value: Planet[keyof Planet]): boolean {
  return isEditableType(value) && value.alternatives.length > 1;
}

export function isCellDirty(value: Planet[keyof Planet]): boolean {
  return isEditableType(value) && isEditableCell(value) && !value.lastEdited;
}

export function getColProps(field: keyof Planet): ColDef<Planet> {
  return {
    field,
    minWidth: 150,
    pinned: getPinned(field),
    headerName: capitalize(field.split("_").join(" ")),
    valueGetter: ({ data }: ValueGetterParams) =>
      isEditableType(data[field]) ? data[field].active : data[field],
    cellEditor: "agSelectCellEditor",
    cellEditorParams: ({ data }: ICellEditorParams) =>
      ({
        values: data[field].alternatives,
      } as ISelectCellEditorParams),
    cellStyle: ({ data }: CellClassParams) =>
      isEditableCell(data[field])
        ? {
            backgroundColor: data[field].lastEdited ? FIELD_DIRTY_BG : FIELD_CLEAN_BG,
          }
        : undefined,
    editable: ({ data }: EditableCallbackParams) => isEditableCell(data[field]),
  };
}

export function findNextEditableCell(
  currentIndex: number,
  planets: Planet[]
): [number, keyof Planet] | null {
  for (
    let index = currentIndex + 1;
    index < currentIndex + planets.length;
    ++index
  ) {
    let key: keyof Planet,
      adjustedIndex = index % planets.length;

    for (key in planets[adjustedIndex]) {
      if (isCellDirty(planets[adjustedIndex][key])) {
        return [adjustedIndex, key as keyof Planet];
      }
    }
  }

  return null;
}
