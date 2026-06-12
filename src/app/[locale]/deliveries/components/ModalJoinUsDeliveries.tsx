"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const ModalJoinUsDeliveries = () => {
  const t = useTranslations("DeliveryPage.joinModal");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">{t("title")}</h2>
            <form className="flex flex-col gap-4">
              <label className="sr-only" htmlFor="join-name">{t("namePlaceholder")}</label>
              <input
                id="join-name"
                type="text"
                placeholder={t("namePlaceholder")}
                className="border rounded-lg px-4 py-2 w-full"
              />
              <label className="sr-only" htmlFor="join-email">{t("emailPlaceholder")}</label>
              <input
                id="join-email"
                type="email"
                placeholder={t("emailPlaceholder")}
                className="border rounded-lg px-4 py-2 w-full"
              />
              <label className="sr-only" htmlFor="join-message">{t("messagePlaceholder")}</label>
              <textarea
                id="join-message"
                placeholder={t("messagePlaceholder")}
                className="border rounded-lg px-4 py-2 w-full"
              />
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                {t("send")}
              </button>
            </form>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-gray-600 hover:underline"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalJoinUsDeliveries;
