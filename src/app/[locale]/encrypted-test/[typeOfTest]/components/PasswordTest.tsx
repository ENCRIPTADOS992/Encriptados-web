"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function PasswordTest() {
  const t = useTranslations();
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    noCommon: false,
  });
  const [stats, setStats] = useState({
    length: 0,
    uppercase: 0,
    lowercase: 0,
    numbers: 0,
    special: 0,
  });

  useEffect(() => {
    const calculateStrength = (pass: string) => {
      let score = 0;
      const newChecks = {
        length: pass.length >= 12,
        uppercase: /[A-Z]/.test(pass),
        lowercase: /[a-z]/.test(pass),
        number: /[0-9]/.test(pass),
        special: /[^A-Za-z0-9]/.test(pass),
        noCommon: !commonPasswords.includes(pass.toLowerCase()),
      };

      const newStats = {
        length: pass.length,
        uppercase: (pass.match(/[A-Z]/g) || []).length,
        lowercase: (pass.match(/[a-z]/g) || []).length,
        numbers: (pass.match(/[0-9]/g) || []).length,
        special: (pass.match(/[^A-Za-z0-9]/g) || []).length,
      };

      Object.values(newChecks).forEach((check) => {
        if (check) score++;
      });

      setChecks(newChecks);
      setStats(newStats);
      return score;
    };

    setStrength(calculateStrength(password));
  }, [password]);

  const getStrengthLabel = (score: number) => {
    const labels = [
      t("passwordTest.strengthCategories.veryWeak"),
      t("passwordTest.strengthCategories.weak"),
      t("passwordTest.strengthCategories.medium"),
      t("passwordTest.strengthCategories.strong"),
      t("passwordTest.strengthCategories.veryStrong"),
      t("passwordTest.strengthCategories.excellent"),
    ];
    return labels[score] || "Sin contraseña";
  };

  const getStrengthColor = (score: number) => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-purple-500",
    ];
    return colors[score] || "bg-gray-300";
  };

  const commonPasswords = [
    "123456",
    "password",
    "qwerty",
    "admin",
    "letmein",
    "welcome",
  ];

  return (
    <div className="w-full max-w-2xl   rounded-lg shadow-lg  h-[645px] p-6 text-white">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {t("passwordTest.verificationTitle")}
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            {t("passwordTest.passwordInputLabel")}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("passwordTest.passwordInputPlaceholder")}
            className="w-full p-2 border border-gray-300 text-black rounded-md"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              {t("passwordTest.strengthLabel")} {getStrengthLabel(strength)}
            </span>
            <span>{Math.round((strength / 6) * 100)}%</span>
          </div>
          <div
            className={`w-full h-2 mt-2 rounded-full ${getStrengthColor(
              strength
            )}`}
            style={{ width: `${(strength / 6) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">
              {t("passwordTest.verificationSubtitle")}
            </h3>
            <ul className="space-y-1">
              <li className="flex items-center">
                {checks.length ? (
                  <span className="text-green-500 mr-2">✔</span>
                ) : (
                  <span className="text-red-500 mr-2">✘</span>
                )}
                <span> {t("passwordTest.verifications.length")}</span>
              </li>
              <li className="flex items-center">
                {checks.uppercase ? (
                  <span className="text-green-500 mr-2">✔</span>
                ) : (
                  <span className="text-red-500 mr-2">✘</span>
                )}
                <span>{t("passwordTest.verifications.uppercase")}</span>
              </li>
              <li className="flex items-center">
                {checks.lowercase ? (
                  <span className="text-green-500 mr-2">✔</span>
                ) : (
                  <span className="text-red-500 mr-2">✘</span>
                )}
                <span>{t("passwordTest.verifications.lowercase")}</span>
              </li>
              <li className="flex items-center">
                {checks.number ? (
                  <span className="text-green-500 mr-2">✔</span>
                ) : (
                  <span className="text-red-500 mr-2">✘</span>
                )}
                <span>{t("passwordTest.verifications.number")}</span>
              </li>
              <li className="flex items-center">
                {checks.special ? (
                  <span className="text-green-500 mr-2">✔</span>
                ) : (
                  <span className="text-red-500 mr-2">✘</span>
                )}
                <span>{t("passwordTest.verifications.special")}</span>
              </li>
              <li className="flex items-center">
                {checks.noCommon ? (
                  <span className="text-green-500 mr-2">✔</span>
                ) : (
                  <span className="text-red-500 mr-2">✘</span>
                )}
                <span>{t("passwordTest.verifications.noCommon")}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">
              {" "}
              {t("passwordTest.statsSubtitle")}
            </h3>
            <ul className="space-y-1">
              <li>
                {t("passwordTest.stats.length")} {stats.length}
              </li>
              <li>
                {t("passwordTest.stats.uppercase")} {stats.uppercase}
              </li>
              <li>
                {" "}
                {t("passwordTest.stats.lowercase")} {stats.lowercase}
              </li>
              <li>
                {" "}
                {t("passwordTest.stats.numbers")} {stats.numbers}
              </li>
              <li>
                {t("passwordTest.stats.special")} {stats.special}
              </li>
            </ul>
          </div>
        </div>

        {password && (
          <div className="text-sm text-gray-500">
            <p> {t("passwordTest.improvementTips")}</p>
            <ul className="list-disc pl-5 space-y-1">
              {!checks.length && (
                <li>{t("passwordTest.improvementMessages.length")}</li>
              )}
              {!checks.uppercase && (
                <li>{t("passwordTest.improvementMessages.uppercase")}</li>
              )}
              {!checks.lowercase && (
                <li>{t("passwordTest.improvementMessages.lowercase")}</li>
              )}
              {!checks.number && (
                <li>{t("passwordTest.improvementMessages.number")}</li>
              )}
              {!checks.special && (
                <li>{t("passwordTest.improvementMessages.special")}</li>
              )}
              {!checks.noCommon && (
                <li>{t("passwordTest.improvementMessages.noCommon")}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
