"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";
import Button from "@/shared/components/Button";
import { ArrowLeft } from "lucide-react";
import { localizeInternalHref } from "@/shared/utils/localizedNavigation";

type TableRow = {
  type: string;
  purpose: string;
  duration: string;
  mandatory: string;
};

export default function PoliticaDeCookiesPage() {
  const locale = useLocale();
  const homeHref = localizeInternalHref("/", locale);
  const tTerms = useTranslations("AppTerms");
  const tCookies = useTranslations("CookiesPolicy");

  const tableHeaders = tCookies.raw("sections.types.table.headers") as string[];
  const tableRows = tCookies.raw("sections.types.table.rows") as TableRow[];
  const thirdPartyList = tCookies.raw("sections.thirdParty.list") as string[];
  const manageList = tCookies.raw("sections.manage.list") as string[];

  return (
    <main className="bg-black text-text-secondary min-h-screen pt-32 pb-20">
      <SectionWrapper>
        <div className="max-w-4xl mx-auto">
          {/* Header Action */}
          <div className="mb-8">
            <Link href={homeHref}>
              <Button intent="ghost" size="sm" className="pl-0 text-primary hover:text-white hover:bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {tTerms("backButton")}
              </Button>
            </Link>
          </div>

          <div className="space-y-8 bg-bg-secondary/30 p-8 md:p-12 rounded-2xl border border-stroke-border/30 backdrop-blur-sm">
            <header className="border-b border-stroke-border/50 pb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{tCookies("title")}</h1>
              <p className="text-primary font-medium">{tCookies("lastUpdated")}</p>
            </header>

            <div className="space-y-6 text-sm md:text-base leading-relaxed">
              {/* Intro */}
              <p>{tCookies("intro.p1")}</p>
              <p>{tCookies("intro.p2")}</p>
              <p>{tCookies("intro.p3")}</p>

              {/* 1. WHAT ARE */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tCookies("sections.whatAre.title")}</h2>
                <p>{tCookies("sections.whatAre.p1")}</p>
                <p>{tCookies("sections.whatAre.p2")}</p>
              </section>

              {/* 2. TYPES */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tCookies("sections.types.title")}</h2>
                
                <div className="overflow-x-auto border border-stroke-border/30 rounded-xl">
                  <table className="w-full min-w-[600px] text-left border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-stroke-border/30 text-white font-semibold">
                        {tableHeaders.map((header, idx) => (
                          <th key={idx} className="p-4 text-sm md:text-base font-semibold">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-stroke-border/20 hover:bg-white/5 transition-colors last:border-b-0">
                          <td className="p-4 text-white font-medium text-sm md:text-base">{row.type}</td>
                          <td className="p-4 text-sm md:text-base text-text-secondary/90">{row.purpose}</td>
                          <td className="p-4 text-sm md:text-base text-text-secondary/80">{row.duration}</td>
                          <td className="p-4 text-sm md:text-base font-semibold text-primary">{row.mandatory}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="italic text-text-secondary/80 mt-2">{tCookies("sections.types.footer")}</p>
              </section>

              {/* 3. THIRD PARTY */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tCookies("sections.thirdParty.title")}</h2>
                <p>{tCookies("sections.thirdParty.p1")}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-primary">
                  {thirdPartyList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p>{tCookies("sections.thirdParty.p2")}</p>
              </section>

              {/* 4. MANAGE */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tCookies("sections.manage.title")}</h2>
                <p>{tCookies("sections.manage.p1")}</p>
                <ul className="list-decimal pl-5 mt-2 space-y-4 marker:text-primary">
                  {manageList.map((item, index) => (
                    <li key={index} style={{ whiteSpace: "pre-line" }}>{item}</li>
                  ))}
                </ul>
                <p className="font-semibold text-white bg-primary/10 p-4 rounded-lg border border-primary/20">{tCookies("sections.manage.note")}</p>
              </section>

              {/* 5. UPDATES */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tCookies("sections.updates.title")}</h2>
                <p>{tCookies("sections.updates.p1")}</p>
              </section>

              {/* 6. CONTACT */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tCookies("sections.contact.title")}</h2>
                <p>{tCookies("sections.contact.p1")}</p>
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 space-y-2">
                  <p className="font-bold text-white">{tCookies("sections.contact.email")}</p>
                  <p className="text-text-secondary/90 font-medium" style={{ whiteSpace: "pre-line" }}>{tCookies("sections.contact.address")}</p>
                </div>
              </section>
            </div>

            <div className="flex justify-center pt-8 border-t border-stroke-border/50">
              <Link href={homeHref}>
                <Button intent="primary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {tTerms("backButton")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
