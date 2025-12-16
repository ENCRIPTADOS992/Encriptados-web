import BneSimPage from "./components/BneSimPage";

const Page = ({ params }: { params: { locale: string } }) => {
  return (
    <>
      <BneSimPage locale={params.locale} />
    </>
  );
};

export default Page;
