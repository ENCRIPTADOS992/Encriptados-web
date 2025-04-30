"use client";
import React from "react";
import TestBasic from "./components/TestBasic";
import { useParams } from "next/navigation";
import PasswordTest from "./components/PasswordTest";
import { useTranslations } from "next-intl";

interface Option {
  answer: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  options: Option[];
}

const Page = () => {
  const { typeOfTest } = useParams();
  const testType = Array.isArray(typeOfTest) ? typeOfTest[0] : typeOfTest;

  const t = useTranslations();

  const questionsPhone = [
    {
      question: t("phoneTest.question1.titleQuestion"),
      options: [
        { answer: t("phoneTest.question1.answer1"), isCorrect: true },
        { answer: t("phoneTest.question1.answer2"), isCorrect: false },
        { answer: t("phoneTest.question1.answer3"), isCorrect: false },
      ],
    },
    {
      question: t("phoneTest.question2.titleQuestion"),
      options: [
        { answer: t("phoneTest.question2.answer1"), isCorrect: true },
        { answer: t("phoneTest.question2.answer2"), isCorrect: false },
      ],
    },
    {
      question: t("phoneTest.question3.titleQuestion"),
      options: [
        { answer: t("phoneTest.question3.answer1"), isCorrect: true },
        { answer: t("phoneTest.question3.answer2"), isCorrect: false },
      ],
    },
    {
      question: t("phoneTest.question4.titleQuestion"),
      options: [
        { answer: t("phoneTest.question4.answer1"), isCorrect: true },
        { answer: t("phoneTest.question4.answer2"), isCorrect: false },
      ],
    },
    {
      question: t("phoneTest.question5.titleQuestion"),
      options: [
        { answer: t("phoneTest.question5.answer1"), isCorrect: true },
        { answer: t("phoneTest.question5.answer2"), isCorrect: false },
      ],
    },
    {
      question: t("phoneTest.question6.titleQuestion"),
      options: [
        { answer: t("phoneTest.question6.answer1"), isCorrect: true },
        { answer: t("phoneTest.question6.answer2"), isCorrect: false },
      ],
    },
    {
      question: t("phoneTest.question7.titleQuestion"),
      options: [
        { answer: t("phoneTest.question7.answer1"), isCorrect: true },
        { answer: t("phoneTest.question7.answer2"), isCorrect: false },
      ],
    },
    {
      question: t("phoneTest.question8.titleQuestion"),
      options: [
        { answer: t("phoneTest.question8.answer1"), isCorrect: true },
        { answer: t("phoneTest.question8.answer2"), isCorrect: false },
      ],
    },
    {
      question: t("phoneTest.question9.titleQuestion"),
      options: [
        { answer: t("phoneTest.question9.answer1"), isCorrect: false },
        { answer: t("phoneTest.question9.answer2"), isCorrect: true },
      ],
    },
    {
      question: t("phoneTest.question10.titleQuestion"),
      options: [
        { answer: t("phoneTest.question10.answer1"), isCorrect: false },
        { answer: t("phoneTest.question10.answer2"), isCorrect: true },
      ],
    },
    {
      question: t("phoneTest.question11.titleQuestion"),
      options: [
        { answer: t("phoneTest.question11.answer1"), isCorrect: true },
        { answer: t("phoneTest.question11.answer2"), isCorrect: false },
      ],
    },
    {
      question: t("phoneTest.question12.titleQuestion"),
      options: [
        { answer: t("phoneTest.question12.answer1"), isCorrect: false },
        { answer: t("phoneTest.question12.answer2"), isCorrect: true },
      ],
    },
    {
      question: t("phoneTest.question13.titleQuestion"),
      options: [
        { answer: t("phoneTest.question13.answer1"), isCorrect: true },
        { answer: t("phoneTest.question13.answer2"), isCorrect: false },
      ],
    },
  ];

  const questionsPassword: Question[] = [
    {
      question: "¿Qué característica debe tener una contraseña segura?",
      options: [
        { answer: "Debe tener al menos 8 caracteres", isCorrect: true },
        { answer: "Debe ser fácil de recordar", isCorrect: false },
        { answer: "Debe contener solo números", isCorrect: false },
        { answer: "Debe contener la fecha de nacimiento", isCorrect: false },
      ],
    },
    {
      question: "¿Qué es la autenticación en dos pasos?",
      options: [
        {
          answer:
            "Es un método de seguridad que requiere dos formas de verificación",
          isCorrect: true,
        },
        { answer: "Es una contraseña más larga", isCorrect: false },
        { answer: "Es la verificación de la huella digital", isCorrect: false },
        {
          answer: "Es una clave de un solo uso por correo electrónico",
          isCorrect: false,
        },
      ],
    },
  ];

  let selectedQuestions: Question[] = [];
  if (testType === "phone") {
    selectedQuestions = questionsPhone;
  } else if (testType === "password") {
    selectedQuestions = questionsPassword;
  }

  // Condicional para renderizar el componente adecuado según el tipo de prueba
  if (testType === "password") {
    return <PasswordTest />;
  }

  return <TestBasic test={selectedQuestions} />;
};

export default Page;
