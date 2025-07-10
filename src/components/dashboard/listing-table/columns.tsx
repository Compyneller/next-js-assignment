"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Approve from "./approve";
import { EditModal } from "./edit-modal";
import Reject from "./reject";
import { Listing } from "@/context/listing-context";

export const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "location",
    header: "Location",
  },

  {
    accessorKey: "pricePerDay",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size={"sm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price/Day
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" text-center">{row.getValue("pricePerDay")}</div>
    ),
  },

  {
    accessorKey: "submittedBy",
    header: "Submitted By",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={cn(
          "capitalize w-fit rounded-full text-xs border px-2 py-1",
          row.getValue("status") === "success"
            ? "border-green-800 bg-green-200 text-green-800"
            : row.getValue("status") === "pending"
            ? "border-yellow-800 bg-yellow-200 text-yellow-800"
            : "border-red-800 bg-red-200 text-red-800"
        )}>
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Approve
          disable={row.original.status === "success"}
          id={row.original.id}
        />
        <Reject
          disable={row.original.status === "rejected"}
          id={row.original.id}
        />
        <EditModal data={row.original} />
        {/* <DeleteModal id={row.original.id}} /> */}
      </div>
    ),
  },
];
