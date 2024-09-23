"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import { useAppContext } from "@/contexts/app-provider";
import { getCookie } from "cookies-next";
import { handleSoftDeletePin } from "@/actions/pins";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface DeletePinModalProps {
  pinId: string;
  pinName: string;
}

const SoftDeletePinModal = ({ pinId, pinName }: DeletePinModalProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const access_token = getCookie("access_token") as string;
  const { isModalSoftDeletePin, handleModalSoftDeletePin, user } =
    useAppContext();

  const handleDelete = async () => {
    if (!user || !access_token) return;
    try {
      await handleSoftDeletePin({
        id: pinId,
        access_token,
      });
      toast({
        title: "Pin deleted",
      });
      router.push(`/profile/${user.id}/_created`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
    handleModalSoftDeletePin(false);
  };

  return (
    <Dialog open={isModalSoftDeletePin} onOpenChange={handleModalSoftDeletePin}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5 text-destructive" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the pin{" "}
            <span className="font-bold text-lg text-muted-foreground">
              {pinName}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleModalSoftDeletePin(false)}
          >
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete Pin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SoftDeletePinModal;
