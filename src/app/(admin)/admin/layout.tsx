import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4">
      <AdminDashboard></AdminDashboard>
      {children}
    </div>
  );
}
