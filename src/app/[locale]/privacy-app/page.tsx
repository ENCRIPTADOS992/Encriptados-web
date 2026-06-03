"use client";

import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function PrivacyPolicyAppPage() {
  const tPrivacy = useTranslations("PrivacyPolicy");

  const sub1List = tPrivacy.raw("sections.info.sub1List") as string[];
  const sub2List = tPrivacy.raw("sections.info.sub2List") as string[];
  const sub3List = tPrivacy.raw("sections.info.sub3List") as string[];
  const useList = tPrivacy.raw("sections.use.list") as string[];
  const shareList = tPrivacy.raw("sections.share.list") as string[];
  const rightsList = tPrivacy.raw("sections.rights.list") as string[];

  return (
    <main className="bg-black text-text-secondary min-h-screen pt-10 pb-20">
      <SectionWrapper>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 bg-bg-secondary/30 p-8 md:p-12 rounded-2xl border border-stroke-border/30 backdrop-blur-sm">
            <header className="border-b border-stroke-border/50 pb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{tPrivacy("title")}</h1>
              <p className="text-primary font-medium">{tPrivacy("lastUpdated")}</p>
            </header>

            <div className="space-y-6 text-sm md:text-base leading-relaxed">
              {/* Intro */}
              <p>{tPrivacy("intro.p1")}</p>
              <p>{tPrivacy("intro.p2")}</p>

              {/* 1. INFO */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tPrivacy("sections.info.title")}</h2>
                <p>{tPrivacy("sections.info.p1")}</p>
                
                <div className="pl-4 border-l-2 border-primary/30 space-y-4 mt-2">
                  <div>
                    <h3 className="font-semibold text-white mb-2">{tPrivacy("sections.info.sub1Title")}</h3>
                    <ul className="list-disc pl-5 space-y-1 marker:text-primary">
                      {sub1List.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-2">{tPrivacy("sections.info.sub2Title")}</h3>
                    <ul className="list-disc pl-5 space-y-1 marker:text-primary">
                      {sub2List.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-2">{tPrivacy("sections.info.sub3Title")}</h3>
                    <ul className="list-disc pl-5 space-y-1 marker:text-primary">
                      {sub3List.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="italic text-text-secondary/80 mt-4">{tPrivacy("sections.info.footer")}</p>
              </section>

              {/* 2. USE */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tPrivacy("sections.use.title")}</h2>
                <p>{tPrivacy("sections.use.p1")}</p>
                <ul className="list-disc pl-5 space-y-1 marker:text-primary">
                  {useList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* 3. SHARE */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tPrivacy("sections.share.title")}</h2>
                <p>{tPrivacy("sections.share.p1")}</p>
                <p>{tPrivacy("sections.share.p2")}</p>
                <ul className="list-disc pl-5 space-y-1 marker:text-primary">
                  {shareList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* 4. COOKIES */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tPrivacy("sections.cookies.title")}</h2>
                <p>{tPrivacy("sections.cookies.p1")}</p>
                <p>
                  {tPrivacy("sections.cookies.p2").includes("Política de Cookies") || tPrivacy("sections.cookies.p2").includes("Cookies Policy") ? (
                    <span style={{ whiteSpace: "pre-line" }}>
                      {tPrivacy("sections.cookies.p2")}
                    </span>
                  ) : (
                    <span>{tPrivacy("sections.cookies.p2")}</span>
                  )}
                </p>
              </section>

              {/* 5. RIGHTS */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tPrivacy("sections.rights.title")}</h2>
                <p>{tPrivacy("sections.rights.p1")}</p>
                <ul className="list-disc pl-5 space-y-1 marker:text-primary">
                  {rightsList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4">{tPrivacy("sections.rights.p2")}</p>
              </section>

              {/* 6. SECURITY */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tPrivacy("sections.security.title")}</h2>
                <p>{tPrivacy("sections.security.p1")}</p>
              </section>

              {/* 7. RETENTION */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tPrivacy("sections.retention.title")}</h2>
                <p>{tPrivacy("sections.retention.p1")}</p>
              </section>

              {/* 8. TRANSFERS */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tPrivacy("sections.transfers.title")}</h2>
                <p>{tPrivacy("sections.transfers.p1")}</p>
              </section>

              {/* 9. MINORS */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tPrivacy("sections.minors.title")}</h2>
                <p>{tPrivacy("sections.minors.p1")}</p>
              </section>

              {/* 10. CHANGES */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tPrivacy("sections.changes.title")}</h2>
                <p>{tPrivacy("sections.changes.p1")}</p>
              </section>

              {/* 11. CONTACT */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{tPrivacy("sections.contact.title")}</h2>
                <p>{tPrivacy("sections.contact.p1")}</p>
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 space-y-4">
                  <div className="space-y-1">
                    <p className="font-bold text-white">{tPrivacy("sections.contact.email")}</p>
                    <p className="text-text-secondary/90 font-medium" style={{ whiteSpace: "pre-line" }}>{tPrivacy("sections.contact.address")}</p>
                  </div>
                  <p className="text-sm font-semibold text-text-secondary/70 border-t border-stroke-border/40 pt-4" style={{ whiteSpace: "pre-line" }}>
                    {tPrivacy("sections.contact.footer")}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
