"use client";

import { Button } from "@/components/ui/button";
import { StarIcon, StarOffIcon } from "lucide-react";
import React, { useState, useEffect, forwardRef } from "react";
import { toast } from "sonner";
import { toggleStarMarked } from "../actions"; // 👈 your backend function

interface MarkedToggleButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  markedForRevision: boolean;
  id: string;
}

export const MarkedToggleButton = forwardRef<
  HTMLButtonElement,
  MarkedToggleButtonProps
>(({ markedForRevision, id, onClick, className, children, ...props }, ref) => {
  
  const [isMarked, setIsMarked] = useState(markedForRevision);

  // Sync with backend value
  useEffect(() => {
    setIsMarked(markedForRevision);
  }, [markedForRevision]);

  const handleToggle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Call parent click if exists
    onClick?.(event);

    const newMarkedState = !isMarked;

    // Optimistic UI update ⚡
    setIsMarked(newMarkedState);

    try {
      const res = await toggleStarMarked(id, newMarkedState);
      const { success, error, isMarked: updatedMarked } = res;

      if (!success) {
        setIsMarked(!newMarkedState);
        toast.error(error || "Failed to update favorite");
        return;
      }

      if (updatedMarked) {
        toast.success("Added to Favorites successfully");
      } else {
        toast.success("Removed from Favorites successfully");
      }
    } catch (error) {
      console.error("Failed to toggle mark:", error);

      // rollback UI ❗
      setIsMarked(!newMarkedState);
      toast.error("Something went wrong");
    }
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      className={`flex items-center justify-start w-full px-2 py-1.5 text-sm rounded-md cursor-pointer ${className}`}
      onClick={handleToggle}
      {...props}
    >
      {isMarked ? (
        <StarIcon size={16} className="text-red-500 mr-2" />
      ) : (
        <StarOffIcon size={16} className="text-gray-500 mr-2" />
      )}

      {children || (isMarked ? "Remove Favorite" : "Add to Favorite")}
    </Button>
  );
});

MarkedToggleButton.displayName = "MarkedToggleButton";