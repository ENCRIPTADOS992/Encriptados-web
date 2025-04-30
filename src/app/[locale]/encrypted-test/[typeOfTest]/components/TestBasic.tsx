"use client";

import React, { useState } from "react";
import CardFinishTest from "./CardFinishTest";
import ShieldTest from "../icons/ShieldTest";
import CheckFinishTest from "./CheckFinishTest";
import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface Option {
  answer: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  options: Option[];
}

interface TestPhoneProps {
  test: Question[];
}

const TestBasic: React.FC<TestPhoneProps> = ({ test }) => {
  const t = useTranslations("phoneTest");
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleOptionClick = (option: Option) => {
    if (selectedOption) return;

    setSelectedOption(option);
    if (option.isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setMessage(t("correctAnswer"));
    } else {
      setMessage(t("incorrectAnswer"));
    }

    setTimeout(() => {
      setSelectedOption(null);
      setMessage("");
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 1000);
  };

  const progressPercentage = (currentQuestionIndex / test.length) * 100;

  return (
    <div className="flex min-h-60 flex-col bg-black px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
        <span>{t("title")}</span>
      </div>

      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-gray-800">
        <div
          className="h-full rounded-full bg-[#35CDFB] transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex-1">
        {currentQuestionIndex < test.length ? (
          <>
            <div className="mb-4 text-white text-center">
              <span>
                {t("answer")} {currentQuestionIndex + 1} {t("of")} {test.length}
              </span>
            </div>
            <h2 className="mb-8 text-xl  text-white font-bold">
              {test[currentQuestionIndex].question}
            </h2>
            <div className="space-y-3">
              {test[currentQuestionIndex].options.map((option, index) => {
                const isSelected = selectedOption?.answer === option.answer;
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={!!selectedOption}
                    className={`flex w-full items-center rounded-lg border ${
                      isSelected
                        ? "border-[#090909] bg-[#00212C] "
                        : "border-[#090909] bg-transparent"
                    } p-4 text-left transition-colors  disabled:cursor-not-allowed`}
                  >
                    <div
                      className={`mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border ${
                        isSelected
                          ? "border-[#35CDFB] bg-[#35CDFB]"
                          : "border-gray-700"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-[#E5E5E5]">
                      {option.answer}
                    </span>
                  </button>
                );
              })}
            </div>
            {message && (
              <p
                className={`mt-4 text-center font-medium ${
                  selectedOption?.isCorrect ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-center font-medium text-[#A2A2A2] tracking-widest uppercase">
              {t("finalScore")}
            </p>

            <div className="flex justify-center items-center mt-4">
              <div className="text-[#35CDFB] w-14 h-14 bg-[#002936] rounded-full items-center flex justify-center">
                {" "}
                <p className="font-bold text-xl">{score}</p>
              </div>
            </div>
            <div className="mt-4">
              <CardFinishTest
                iconPosition="left"
                title={t("protectTop")}
                icon={<ShieldTest />}
              />
            </div>
            <div className="mt-4">
              <CheckFinishTest
                options={[t("complement"), t("solutions"), t("startservices")]}
              />

              <div className="mt-4">
                <Button
                  intent="support"
                  onClick={() => {
                    router.push("/encrypted-test");
                  }}
                >
                  {t("backToTests")}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestBasic;
