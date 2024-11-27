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
import {
  handleAdminBannedUser,
  handleAdminListUsers,
  handleAdminUnbannedUser,
} from "@/actions/user";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import authApiRequest from "@/actions/auth";
import { useToast } from "@/components/ui/use-toast";

export default function UserManagement() {
  const access_token = getCookie("access_token") as string;
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const pageNumber = Number(searchParams.get("page")) || 1;
  const limitNumber = Number(searchParams.get("limit")) || 5;

  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const totalPages = useMemo(
    () => Math.ceil(totalItems / limitNumber),
    [totalItems, limitNumber]
  );
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token, limitNumber, pageNumber]);

  const handlePageChange = (newPage: number) => {
    router.push(`/admin?page=${newPage}&limit=${limitNumber}`);
  };

  const addUser = async () => {
    try {
      await authApiRequest.register({
        email: newUser.email,
        password: newUser.password,
        username: newUser.name,
      });

      setNewUser({ name: "", email: "", password: "" });
      fetchData();
      router.push(`/admin?page=1&limit=${limitNumber}`);
      toast({
        title: "Add user successful",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const bannedUser = async (id: string) => {
    try {
      await handleAdminBannedUser({
        id,
        access_token,
      });
      fetchData();
      toast({
        title: "Ban user successful",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const unBannedUser = async (id: string) => {
    try {
      await handleAdminUnbannedUser({
        id,
        access_token,
      });
      fetchData();
      toast({
        title: "Unban user successful",
      });
    } catch (error) {
      console.log(error);
    }
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
        <Input
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
                {user.id !== "66c29a238a5ee917e051e577" ? (
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      if (!user.banned_at) bannedUser(user.id);
                      else unBannedUser(user.id);
                    }}
                  >
                    {user.banned_at ? "Unban" : "Ban"}
                  </Button>
                ) : (
                  <div></div>
                )}
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
