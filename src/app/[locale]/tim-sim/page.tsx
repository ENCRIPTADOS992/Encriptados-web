import BneSimPage from "./components/BneSimPage";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  return (
    <>
      <BneSimPage locale={locale} />
    </>
  );
};

export default Page;
