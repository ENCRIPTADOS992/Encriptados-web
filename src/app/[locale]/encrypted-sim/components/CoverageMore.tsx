import { useTranslations } from "next-intl";

const CoverageMore = () => {
  const t = useTranslations("EncryptedSimPage");

  return (
    <>
      <h2 className="text-center mt-12 text-2xl font-bold bg-gradient-to-r from-black to-[#31CADD] bg-clip-text text-transparent">
        {t("coverageTitle")}
      </h2>
      <div className="flex justify-center mt-4">
        <p className="text-center w-5/12">{t("coverageDescription")}</p>
      </div>
    </>
  );
};

export default CoverageMore;
