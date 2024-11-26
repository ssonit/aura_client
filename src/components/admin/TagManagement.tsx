"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "./Pagination";
import { Suggestion } from "@/types/pin";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";
import { handleListTags } from "@/actions/tags";

// Mock data
const initialTags = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `tag${i + 1}`,
}));

export default function TagManagement() {
  const access_token = getCookie("access_token") as string;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [listTags, setListTags] = useState<Suggestion[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const pageNumber = Number(searchParams.get("page")) || 1;
  const limitNumber = Number(searchParams.get("limit")) || 5;

  const totalPages = useMemo(
    () => Math.ceil(totalItems / limitNumber),
    [totalItems, limitNumber]
  );

  useEffect(() => {
    async function fetchData() {
      const res = await handleListTags({
        access_token,
        page: pageNumber,
        limit: limitNumber,
      });
      if (res.data) {
        setListTags(res.data);
        setTotalItems(res.paging.total);
      }
    }
    fetchData();
  }, [access_token, limitNumber, pageNumber]);

  const handlePageChange = (newPage: number) => {
    router.push(`/admin/tags?page=${newPage}&limit=${limitNumber}`);
  };

  const addTag = () => {};

  const deleteTag = (id: string) => {};

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Tag Management</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listTags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>{tag.id}</TableCell>
              <TableCell>{tag.name}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deleteTag(tag.id)}>
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
          router.push(`/admin/tags?page=1&limit=${value}`);
        }}
      />
    </div>
  );
}
