"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import OnlyKeyLoginIconSvg from "@/shared/svgs/OnlyKeyLoginIconSvg";
import CircleTitle from "@/shared/components/CircleTitle";
import CopyPaste from "@/shared/svgs/CopyPast";
import Download from "@/shared/svgs/Download";
import Button from "@/shared/components/Button";
import { useRegisterToken } from "@/features/auth/mutations/useRegisterToken";
import { useAuthLogin } from "@/features/auth/mutations/useAuthLogin";
import { LoginWithTokenResponse } from "@/features/auth/types/loginWithToken";
import { RegisterTokenResponse } from "@/features/auth/types/registerToken";
import { useToast } from "@/shared/context/ToastContext";
import Cookies from "js-cookie";
import Loader from "@/shared/components/Loader";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const AccountNumber = () => {
  const t = useTranslations();
  const router = useRouter();
  const Mans = "/images/login/mans.png";

  const { setValue, getValues } = useFormContext();
  const [generatedNumber, setGeneratedNumber] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);

  const { success, error: errorToast } = useToast();

  const { registerToken, isPending } = useRegisterToken({
    onSuccess: (data) => {
      const responseData = data as RegisterTokenResponse;
      animateToken(responseData.data.token);
      setValue("currentGeneratedNumber", responseData.data.token);

      success(
        t("LoginPage.generatedSection.accountNumber.succesfulyGenerateAccount")
      );
    },
    onError: () => {
      errorToast(
        t("LoginPage.generatedSection.accountNumber.errorMessageNumberAccount")
      );
    },
  });

  const { login, isPending: isPendingLoading } = useAuthLogin({
    onSuccess: async (data) => {
      try {
        const responseData = data as LoginWithTokenResponse;
        success(t("LoginPage.generatedSection.accountNumber.loginSuccesfuly"));
        Cookies.set("authToken", responseData.data.token, {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "None",
        });
        router.push("/dashboard/data-usage");
      } catch (error) {
        console.log(error);
        errorToast(t("LoginPage.generatedSection.accountNumber.errorMessage"));
      }
    },
  });

  const animateToken = (token: string) => {
    setIsGenerating(true);
    setGeneratedNumber("");
    const formattedToken = token.replace(/(.{4})/g, "$1 ").trim(); // Añade un espacio cada 4 caracteres
    const finalNumber = Array.from(formattedToken);

    finalNumber.forEach((digit, index) => {
      setTimeout(() => {
        setGeneratedNumber((prev) => prev + digit);
        if (index === finalNumber.length - 1) {
          setIsGenerating(false);
          setValue("generatedCurrentNumberSeparated", formattedToken);
        }
      }, index * 100);
    });
  };

  const copyToClipboard = () => {
    const accountNumber = getValues("currentGeneratedNumber");
    if (accountNumber) {
      navigator.clipboard.writeText(accountNumber).then(() => {
        success(
          t("LoginPage.generatedSection.accountNumber.copyNumberSuccesfully")
        );
      });
    }
  };

  const handleRegisterToken = () => {
    if (!generatedNumber) {
      registerToken();
    } else {
      login({ token: getValues("currentGeneratedNumber") });
    }
  };

  return (
    <>
      <div className="hidden md:flex md:flex-col justify-center w-full md:w-5/12 lg:w-4/12 mb-6 md:mb-0 md:mr-6">
        <h2 className="text-white mt-2 text-sm md:text-base lg:text-lg font-light">
          {t("LoginPage.generatedSection.accountNumber.title")}
        </h2>
        <div className="w-8/12 mt-6 md:mt-8">
          <Image
            className="object-contain w-full"
            width={800}
            height={800}
            src={Mans}
            alt="Login illustration"
          />
        </div>
      </div>

      <div className="w-full md:w-[500px] bg-[#0E0E0E] h-auto md:h-[500px] rounded-2xl flex flex-col py-10 px-8 items-center gap-y-4 md:px-10 relative">
        <OnlyKeyLoginIconSvg height={70} width={70} color="white" />
        <h1 className="text-white text-center text-sm md:text-base">
          {t("LoginPage.generatedSection.accountNumber.generateAccountNumber")}
        </h1>

        <div className="w-full space-y-3 text-center">
          <div className="bg-[#191919] py-3 rounded-xl border-0.5 border-[#414141] text-white text-lg font-mono mb-3 select-none">
            {generatedNumber || "—— —— —— —— —— —— —— "}
          </div>

          <Button
            type="button"
            onClick={handleRegisterToken}
            customStyles="w-full h-12 bg-[#2BACEF] hover:bg-[#2bb8e7] text-base text-white font-medium items-center justify-center"
            rounded="full"
            intent="primary"
            disabled={isPending || isGenerating}
          >
            {isGenerating
              ? t("LoginPage.generatedSection.accountNumber.generating")
              : generatedNumber
              ? t("LoginPage.generatedSection.accountNumber.login")
              : t(
                  "LoginPage.generatedSection.accountNumber.generateAccountNumber"
                )}
          </Button>
        </div>

        {getValues("generatedCurrentNumberSeparated") && (
          <div className="w-full mt-3">
            <hr className="w-full border-[#373737] my-2 mb-6" />
            <div className="flex w-full gap-x-2">
              <CircleTitle
                icon={<CopyPaste />}
                iconPosition="right"
                intent="white"
                customStyles="w-6/12 h-12 justify-center cursor-pointer rounded-xl"
                onClick={copyToClipboard}
              >
                {t("LoginPage.generatedSection.accountNumber.copy")}
              </CircleTitle>
              <CircleTitle
                onClick={() => {}}
                icon={<Download color="#2AABEE" />}
                iconPosition="right"
                intent="primary"
                customStyles="w-6/12 justify-center cursor-pointer font-light rounded-xl"
              >
                {t("LoginPage.generatedSection.accountNumber.download")}
              </CircleTitle>
            </div>
          </div>
        )}

        <h1
          onClick={() => {
            setValue("currentStep", "welcome");
          }}
          className="text-white text-sm cursor-pointer mt-4"
        >
          {t("LoginPage.generatedSection.accountNumber.goBack")}
        </h1>
      </div>
      {isPendingLoading || isPending ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10">
          <Loader />
        </div>
      ) : null}
    </>
  );
};

export default AccountNumber;
