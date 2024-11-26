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
import { handleAddTag, handleDeleteTag, handleListTags } from "@/actions/tags";
import { useToast } from "@/components/ui/use-toast";

export default function TagManagement() {
  const access_token = getCookie("access_token") as string;
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [listTags, setListTags] = useState<Suggestion[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [tag, setTag] = useState("");

  const pageNumber = Number(searchParams.get("page")) || 1;
  const limitNumber = Number(searchParams.get("limit")) || 5;

  const totalPages = useMemo(
    () => Math.ceil(totalItems / limitNumber),
    [totalItems, limitNumber]
  );

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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token, limitNumber, pageNumber]);

  const handlePageChange = (newPage: number) => {
    router.push(`/admin/tags?page=${newPage}&limit=${limitNumber}`);
  };

  const addTag = async () => {
    try {
      await handleAddTag({ access_token, tag });
      setTag("");
      router.push(`/admin/tags?page=1&limit=${limitNumber}`);
      router.refresh();
      fetchData();
      toast({
        title: "Tag added",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTag = async (id: string) => {
    try {
      await handleDeleteTag({ access_token, id });
      router.push(`/admin/tags?page=1&limit=${limitNumber}`);
      router.refresh();
      fetchData();
      toast({
        title: "Tag deleted",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Tag Management</h2>
      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Tag name"
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
          }}
        />
        <Button onClick={addTag}>Add Tag</Button>
      </div>
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
