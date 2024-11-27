"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "./Pagination";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { Pin } from "@/types/pin";
import {
  handleListPins,
  handleRestorePin,
  handleSoftDeletePin,
} from "@/actions/pins";
import { SortType } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import EditAdminModal from "./EditAdminModal";
import { useAppContext } from "@/contexts/app-provider";

export default function PinManagement() {
  const access_token = getCookie("access_token") as string;
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { handleModalEditPin } = useAppContext();

  const [listPins, setListPins] = useState<Pin[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [editPin, setEditPin] = useState<Pin | null>(null);

  const pageNumber = Number(searchParams.get("page")) || 1;
  const limitNumber = Number(searchParams.get("limit")) || 5;

  const totalPages = useMemo(
    () => Math.ceil(totalItems / limitNumber),
    [totalItems, limitNumber]
  );

  async function fetchData() {
    const res = await handleListPins(pageNumber, limitNumber, access_token, {
      sort: SortType.Desc,
    });
    if (res.data) {
      setListPins(res.data);
      setTotalItems(res.paging.total);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token, limitNumber, pageNumber]);

  const handlePageChange = (newPage: number) => {
    router.push(`/admin/pins?page=${newPage}&limit=${limitNumber}`);
  };

  const deletePin = async (id: string) => {
    try {
      await handleSoftDeletePin({
        id,
        access_token,
      });
      toast({
        title: "Pin deleted successfully",
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const restorePin = async (id: string) => {
    try {
      await handleRestorePin({
        id,
        access_token,
      });
      toast({
        title: "Pin restored successfully",
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPin = (pin: Pin) => {
    handleModalEditPin(true);
    setEditPin(pin);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pin Management</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listPins.map((pin) => (
            <TableRow key={pin.id}>
              <TableCell>{pin.id}</TableCell>
              <TableCell>{pin.title}</TableCell>
              <TableCell className="max-w-[600px]">{pin.description}</TableCell>
              <TableCell>
                <img
                  src={pin.media.url}
                  alt={pin.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </TableCell>
              <TableCell>{pin.user.username}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => handleEditPin(pin)}>
                    Edit
                  </Button>

                  {pin?.deleted_at ? (
                    <Button
                      onClick={() => {
                        restorePin(pin.id);
                      }}
                    >
                      Restore
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        deletePin(pin.id);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        itemsPerPage={limitNumber}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onItemsPerPageChange={(value) => {
          router.push(`/admin/pins?page=1&limit=${value}`);
        }}
      />
      {editPin && <EditAdminModal pin={editPin} />}
    </div>
  );
}
