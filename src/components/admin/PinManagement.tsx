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
import { handleListPins } from "@/actions/pins";
import { SortType } from "@/constants";

export default function PinManagement() {
  const access_token = getCookie("access_token") as string;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [listPins, setListPins] = useState<Pin[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const pageNumber = Number(searchParams.get("page")) || 1;
  const limitNumber = Number(searchParams.get("limit")) || 5;

  const totalPages = useMemo(
    () => Math.ceil(totalItems / limitNumber),
    [totalItems, limitNumber]
  );

  useEffect(() => {
    async function fetchData() {
      const res = await handleListPins(pageNumber, limitNumber, access_token, {
        sort: SortType.Desc,
      });
      if (res.data) {
        setListPins(res.data);
        setTotalItems(res.paging.total);
      }
    }
    fetchData();
  }, [access_token, limitNumber, pageNumber]);

  const handlePageChange = (newPage: number) => {
    router.push(`/admin/pins?page=${newPage}&limit=${limitNumber}`);
  };

  const deletePin = (id: string) => {};

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
                <Button variant="destructive" onClick={() => deletePin(pin.id)}>
                  Delete
                </Button>
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
    </div>
  );
}
