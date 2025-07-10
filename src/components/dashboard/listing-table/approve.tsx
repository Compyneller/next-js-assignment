import React, { useCallback } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useListings } from "@/context/listing-context";
const Approve = ({ id, disable }: { id: number; disable: boolean }) => {
  const { updateListingStatus } = useListings();
  const handleApprove = useCallback(() => {
    updateListingStatus(id, "success");
  }, [id]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"icon"}
          className="bg-green-400"
          disabled={disable}
          onClick={handleApprove}>
          <Check />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Approve</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Approve;
