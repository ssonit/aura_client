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
import { User } from "@/types/auth";
import { handleAdminListUsers } from "@/actions/user";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserManagement() {
  const access_token = getCookie("access_token") as string;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const pageNumber = Number(searchParams.get("page")) || 1;
  const limitNumber = Number(searchParams.get("limit")) || 5;

  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const totalPages = useMemo(
    () => Math.ceil(totalItems / limitNumber),
    [totalItems, limitNumber]
  );

  useEffect(() => {
    async function fetchData() {
      const res = await handleAdminListUsers({
        access_token,
        page: pageNumber,
        limit: limitNumber,
      });
      if (res.data) {
        setListUsers(res.data);
        setTotalItems(res.paging.total);
      }
    }
    fetchData();
  }, [access_token, limitNumber, pageNumber]);

  const handlePageChange = (newPage: number) => {
    router.push(`/admin?page=${newPage}&limit=${limitNumber}`);
  };

  const addUser = () => {
    // if (newUser.name && newUser.email) {
    //   setUsers([{ id: users.length + 1, ...newUser }, ...users]);
    //   setNewUser({ name: "", email: "" });
    //   setCurrentPage(1); // Reset to first page when adding a new user
    // }
  };

  const deleteUser = (id: string) => {
    // setUsers(users.filter((user) => user.id !== id));
    // if (currentUsers.length === 1 && currentPage > 1) {
    //   setCurrentPage(currentPage - 1);
    // }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <Input
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <Button onClick={addUser}>Add User</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => deleteUser(user.id)}
                >
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
          router.push(`/admin?page=1&limit=${value}`);
        }}
      />
    </div>
  );
}
