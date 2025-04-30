"use client";

import { InputFormContext } from "@/shared/components/InputFormContext";
import UserInputIcon from "../icons/UserInputIcon";
import MessageInputIcon from "../icons/MessageInputIcon";
import ChatIconInput from "../icons/ChatIconInput";
import StoreIconInput from "../icons/StoreIconInput";
import ArrowDistributors from "../icons/ArrowDistributors";
import { useTranslations } from "next-intl";

export default function DistributorForm() {
  const t = useTranslations("DistributorsPage");
  return (
    <div className="bg-black text-white rounded-3xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
        <div className="relative w-full h-full min-h-[300px] md:min-h-[600px]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{
              backgroundImage: "url(/images/distributors/man-modal-black.png)",
            }}
          />
          <div className="relative z-10 space-y-4 p-6 h-full flex flex-col ">
            <ArrowDistributors />
            <h1 className="text-3xl md:text-5xl font-bold">
              {t("modal.becomeDistributor")}
            </h1>
            <p className="text-lg md:text-xl text-white">
              {t("modal.descriptionDistributor")}
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 border-zinc-800 rounded-r-lg p-6 w-full">
          <h2 className="text-2xl font-bold mb-6">
            {" "}
            {t("modal.requestDistributor")}
          </h2>

          <div className="">
            <div>
              <p className="mb-2 text-[#888888]">{t("modal.inputName")}</p>
              <InputFormContext
                icon={<UserInputIcon />}
                iconPosition="left"
                dark
                name="testing"
              />
            </div>
            <div>
              <p className="mb-2 text-[#888888]">{t("modal.inputEmail")}</p>
              <InputFormContext
                icon={<MessageInputIcon />}
                iconPosition="left"
                dark
                name="testing"
              />
            </div>
            <div>
              <p className="mb-2 text-[#888888]">{t("modal.inputContact")}</p>
              <InputFormContext
                icon={<ChatIconInput />}
                iconPosition="left"
                dark
                name="testing"
              />
            </div>

            <div>
              <p className="mb-2 text-[#888888]">{t("modal.inputStore")}</p>
              <InputFormContext
                icon={<StoreIconInput />}
                iconPosition="left"
                dark
                name="testing"
              />
            </div>

            <div>
              <p className="mb-2 text-[#888888]">
                {t("modal.inputExperience")}
              </p>
              <InputFormContext iconPosition="left" dark name="testing" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            {t("modal.sendRequest")}
          </button>
        </div>
      </div>
    </div>
  );
}
