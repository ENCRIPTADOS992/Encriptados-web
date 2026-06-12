export default function AppsLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <main className="font-sans">{children}</main>;
}
