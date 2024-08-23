import HeaderPin from "@/components/global/HeaderPin";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderPin></HeaderPin>
      <div className="mt-16 relative">{children}</div>
    </div>
  );
}
