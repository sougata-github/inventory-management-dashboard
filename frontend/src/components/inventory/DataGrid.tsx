import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Column<T> {
  field: keyof T;
  headerName: string;
  width: number;
  valueGetter?: (value: T[keyof T], row: T) => React.ReactNode;
  type?: string;
}

export interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function DataGrid<T>({ columns, data }: DataGridProps<T>) {
  return (
    <div className="rounded-sm border overflow-x-auto mt-5">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.field as string}
                style={{ width: column.width }}
                className="py-4"
              >
                {column.headerName}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.field as string}>
                  {column.valueGetter
                    ? column.valueGetter(row[column.field], row)
                    : (row[column.field] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
