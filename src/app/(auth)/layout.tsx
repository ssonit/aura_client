import BackButton from "@/components/global/BackButton";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="fixed z-[100] pl-4 py-8">
        <BackButton></BackButton>
      </div>
      <div>{children}</div>
    </div>
  );
}
