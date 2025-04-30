import React from "react";
import Image from "next/image";
import { InputFormContext } from "@/shared/components/InputFormContext";
import { useFormContext } from "react-hook-form";
import PassKeyLoginIconSvg from "@/shared/svgs/PassKeyLoginIconSvg";
import { useAuthLogin } from "@/features/auth/mutations/useAuthLogin";
import { LoginWithTokenResponse } from "@/features/auth/types/loginWithToken";
import { useToast } from "@/shared/context/ToastContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Loader from "@/shared/components/Loader";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";

const Welcome = () => {
  const t = useTranslations();
  const router = useRouter();
  const Mans = "/images/login/mans.png";

  const { handleSubmit, setValue } = useFormContext();
  const { success, error: errorToast } = useToast();

  const { login, isPending } = useAuthLogin({
    onError: () => {
      errorToast(t("LoginPage.welcomeSection.errorLogin"));
    },
    onSuccess: async (data) => {
      try {
        const responseData = data as LoginWithTokenResponse;
        success(t("LoginPage.welcomeSection.succesfullyLogin"));
        Cookies.set("authToken", responseData?.data?.token, {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "None",
        });
        router.push("/dashboard/data-usage");
      } catch (error) {
        console.log(error);
        errorToast(t("LoginPage.welcomeSection.errorWhileLogin"));
      }
    },
  });

  return (
    <>
      <div className="hidden md:flex md:flex-col justify-center w-full md:w-5/12 lg:w-4/12 mb-6 md:mb-0 md:mr-6">
        <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2">
          {t("LoginPage.welcomeSection.titleGenerate")}{" "}
          <span className="text-[#35CDFB]">
            {t("LoginPage.welcomeSection.withAccesCode")}
          </span>
        </h1>
        <h2 className="text-white mt-2 text-sm md:text-base lg:text-lg font-light">
          {t("LoginPage.welcomeSection.subtitleGenerate")}
        </h2>
        <div className="w-8/12 mt-6 md:mt-8">
          <Image
            className="object-contain w-full"
            width={500}
            quality={100}
            height={500}
            src={Mans}
            alt="Login illustration"
          />
        </div>
      </div>

      <div className="w-full h-screen md:h-auto md:w-[500px] bg-[#0E0E0E] md:rounded-2xl flex flex-col justify-center items-center gap-y-6 p-6 md:p-10">
        <PassKeyLoginIconSvg height={60} width={60} color="white" />
        <h1 className="text-white text-center text-xl md:text-2xl lg:text-3xl font-medium">
          {t("LoginPage.welcomeSection.welcome")}
        </h1>

        <div className="w-full space-y-0 ">
          <InputFormContext
            placeholder={t(
              "LoginPage.welcomeSection.writeYourAccountPlaceholder"
            )}
            type="password"
            name="accountNumber"
            customClassName="w-full bg-[#191919] h-14 border-none rounded-full text-base md:text-lg text-white placeholder:text-[#6A6A6A] "
          />
          <Button
            onClick={handleSubmit((data) => {
              login({ token: data.accountNumber });
            })}
            customStyles="w-full h-12 bg-[#2BACEF] hover:bg-[#2bb8e7] text-base text-white font-medium  items-center justify-center"
            rounded="full"
          >
            {t("LoginPage.welcomeSection.login")}
          </Button>
        </div>

        <div className="w-full flex justify-center cursor-pointer">
          <h1 className="text-[#7E7E7E] text-sm md:text-base my-4">
            {t("LoginPage.welcomeSection.forgotPassword")}
          </h1>
        </div>

        <hr className="w-full border-[#373737]" />

        {isPending ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10">
            <Loader />
          </div>
        ) : null}

        <button
          onClick={() => {
            setValue("currentStep", "accountnumber");
          }}
          className="mt-8 w-full h-14 bg-transparent border border-[#7E7E7E] hover:border-[#2BACEF] text-base md:text-lg text-white font-medium rounded-full transition-colors"
        >
          {t("LoginPage.welcomeSection.generateAccountNumber")}
        </button>
      </div>
    </>
  );
};

export default Welcome;
