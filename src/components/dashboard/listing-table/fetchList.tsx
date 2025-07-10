"use client";
import { useListings } from "@/context/listing-context";
import { useMemo } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const List = () => {
  const { listings } = useListings();
  const memoColumns = useMemo(() => columns, []);
  const memoListings = useMemo(() => listings, [listings]);
  return (
    <>
      <DataTable columns={memoColumns} data={memoListings} />
    </>
  );
};

export default List;
