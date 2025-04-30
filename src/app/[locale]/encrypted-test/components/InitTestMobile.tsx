import Button from "@/shared/components/Button";

import KeyResponsive from "../icons/KeyResponsive";
import PhoneResponsive from "../icons/PhoneResponsive";
import KeyRotateResponsive from "../icons/KeyRotateResponsive";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function InitTestMobile() {
  const router = useRouter();

  const t = useTranslations("EncryptedTestPage");
  return (
    <div className="min-h-screen bg-black p-6 space-y-6">
      <div className="bg-gradient-to-b from-black to-[#00232E] border-0 p-6 space-y-2 rounded-2xl">
        <PhoneResponsive />

        <h2 className="text-xl font-semibold text-white">
          {t("tryOurPhoneSecure.title")}
        </h2>
        <p className="text-sm text-zinc-400 ">
          {t("tryOurPhoneSecure.description")}
        </p>
        <div className="pt-7">
          <Button
            onClick={() => {
              router.push("encrypted-test/phone");
            }}
            icon={<KeyRotateResponsive />}
            rounded="full"
            iconPosition="right"
            intent="support"
          >
            {t("initTest")}
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-b from-black to-[#00232E] border-0 p-6 rounded-2xl space-y-2">
        <KeyResponsive />

        <h2 className="text-xl font-semibold text-white">
          {t("tryPassowordSecure.title")}
        </h2>
        <p className="text-sm text-zinc-400">
          {t("tryPassowordSecure.description")}
        </p>
        <div className="pt-7">
          <Button
            onClick={() => {
              router.push("encrypted-test/password");
            }}
            icon={<KeyRotateResponsive />}
            rounded="full"
            iconPosition="right"
            intent="support"
          >
            {t("initTest")}
          </Button>
        </div>
      </div>
    </div>
  );
}
