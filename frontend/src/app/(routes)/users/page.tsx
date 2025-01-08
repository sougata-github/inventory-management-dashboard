"use client";

import { DataGrid } from "@/components/DataGrid";
import Header from "@/components/Header";
import Loader from "@/components/users/Loader";
import { usersColumns } from "@/constants";
import { useGetUsersQuery } from "@/state/api";

export default function Page() {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !users) {
    return <div className="text-center py-4">Failed to fetch products!</div>;
  }

  return (
    <section className="flex flex-col">
      <Header name="Users" />
      <DataGrid data={users} columns={usersColumns} />
    </section>
  );
}
