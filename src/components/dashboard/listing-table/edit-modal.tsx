"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useListings } from "@/context/listing-context";
import { Edit } from "lucide-react";
import { useState } from "react";
import { ColListing } from "./columns";
import toast from "react-hot-toast";

export function EditModal({ data }: { data: ColListing }) {
  const [open, setOpen] = useState(false);
  const { updateList } = useListings();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedFields: Record<string, any> = {};

    formData.forEach((value, key) => {
      updatedFields[key] = key === "pricePerDay" ? Number(value) : value;
    });

    try {
      await toast.promise(Promise.resolve(updateList(data, updatedFields)), {
        loading: "Updating listing...",
        success: "Listing updated successfully!",
        error: "Failed to update listing.",
      });

      setOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update listing.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size={"icon"} onClick={() => setOpen(true)}>
              <Edit />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit Item</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={data.title} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={data.description}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={data.location}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pricePerDay">Price/Day</Label>
              <Input
                id="pricePerDay"
                name="pricePerDay"
                type="number"
                defaultValue={data.pricePerDay}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="submittedBy">Submitted By</Label>
              <Input
                id="submittedBy"
                name="submittedBy"
                defaultValue={data.submittedBy}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
