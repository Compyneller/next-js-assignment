"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export type Listing = {
  id: number;
  title: string;
  description: string;
  location: string;
  pricePerDay: number;
  submittedBy: string;
  status: string;
};

type ListingContextType = {
  listings: Listing[];
  refreshListings: () => void;
  updateListingStatus: (id: number, status: string) => void;
  updateList: (data: Listing, updatedFields: Partial<Listing>) => void;
  deleteList: (id: number) => void;
};

const ListingsContext = createContext<ListingContextType | null>(null);

export const ListingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [listings, setListings] = useState<Listing[]>([]);

  const refreshListings = async () => {
    const { data } = await axios.get("/api/listing");
    setListings((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(data)) {
        return data;
      }
      return prev;
    });
  };

  const updateList = async (data: Listing, updatedFields: Partial<Listing>) => {
    try {
      await axios.put(`/api/listing`, {
        id: data.id,
        ...updatedFields,
      });
      refreshListings();
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  const updateListingStatus = async (id: number, status: string) => {
    try {
      await axios.patch(`/api/listing/status`, { id, status });
      toast.success(`Status updated to ${status}`);
      refreshListings();
    } catch (error) {
      console.error("Error updating listing status:", error);
      toast.error("Failed to update status");
    }
  };

  const deleteList = async (id: number) => {
    try {
      const response = await axios.delete(`/api/listing/`, {
        data: { id: id },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error("Failed to delete the item");
      }
      refreshListings();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    refreshListings();
  }, []);

  return (
    <ListingsContext.Provider
      value={{
        listings,
        refreshListings,
        updateListingStatus,
        deleteList,
        updateList,
      }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error("useListings must be used within a ListingsProvider");
  }
  return context;
};
