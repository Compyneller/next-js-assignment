import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useListings } from "@/context/listing-context";
import { X } from "lucide-react";
import { useCallback } from "react";
const Reject = ({ id, disable }: { id: number; disable: boolean }) => {
  const { updateListingStatus } = useListings();

  const handleReject = useCallback(() => {
    updateListingStatus(id, "rejected");
  }, [id]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"icon"}
          variant={"destructive"}
          onClick={handleReject}
          disabled={disable}>
          <X />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Reject</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Reject;
