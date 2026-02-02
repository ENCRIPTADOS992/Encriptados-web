import React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { SecurityTestCard } from "./SecurityTestCard";

const InitTestEncrypted = () => {
  const router = useRouter();
  const t = useTranslations("EncryptedTestPage");

  return (
    <section className="w-full" style={{ background: "linear-gradient(180deg, #000000 52.5%, #002F21 100%)" }}>
      <div className="w-full flex flex-col gap-6 py-10 md:py-16 lg:py-20 px-4 max-w-7xl mx-auto">
        {/* Phone Security Test Card */}
        <SecurityTestCard
          icon="/images/encrypted-test/icons/add_to_home_screen.svg"
          title={t("tryOurPhoneSecure.title")}
          description={t("tryOurPhoneSecure.description")}
          backgroundImage="/images/encrypted-test/images/fondo-prueba-celular-seguro.webp"
          onStartTest={() => router.push("encrypted-test/phone")}
        />

        {/* Password Security Test Card */}
        <SecurityTestCard
          icon="/images/encrypted-test/icons/key_vertical.svg"
          title={t("tryPassowordSecure.title")}
          description={t("tryPassowordSecure.description")}
          backgroundImage="/images/encrypted-test/images/fondo-seguridad-contraseña.webp"
          onStartTest={() => router.push("encrypted-test/password")}
        />
      </div>
    </section>
  );
};

export default InitTestEncrypted;
