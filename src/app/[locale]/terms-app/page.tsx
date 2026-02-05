"use client";

import SectionWrapper from "@/shared/components/SectionWrapper";
import Button from "@/shared/components/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function TerminosYCondicionesAppPage() {
    const router = useRouter();
    const t = useTranslations("AppTerms");

    const handleBack = () => {
        router.back();
    };

    return (
        <main className="bg-black text-text-secondary min-h-screen pt-10 pb-20">
            <SectionWrapper>
                <div className="max-w-4xl mx-auto">
                    {/* Botón Volver a la App */}
                    <div className="mb-6 sticky top-4 z-50">
                        <Button
                            intent="primary"
                            size="sm"
                            className="shadow-lg backdrop-blur-md bg-primary/90 hover:bg-primary text-black font-bold"
                            onClick={handleBack}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t("backButton")}
                        </Button>
                    </div>

                    <div className="space-y-8 bg-bg-secondary/30 p-8 md:p-12 rounded-2xl border border-stroke-border/30 backdrop-blur-sm">

                        <header className="border-b border-stroke-border/50 pb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{t("title")}</h1>
                            <p className="text-primary font-medium">{t("domain")}</p>
                        </header>

                        <div className="space-y-6 text-sm md:text-base leading-relaxed">
                            <p>
                                {t("intro")}
                            </p>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.info.title")}</h2>
                                <p>
                                    {t("sections.info.p1")}
                                </p>
                                <p>
                                    {t("sections.info.p2")}
                                </p>
                                <p>
                                    {t("sections.info.p3")}
                                </p>
                                <p>
                                    {t("sections.info.p4")}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.products.title")}</h2>
                                <p>
                                    {t("sections.products.p1")}
                                </p>
                                <p>
                                    {t("sections.products.p2")}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.capacity.title")}</h2>
                                <p>
                                    {t("sections.capacity.p1")}
                                </p>
                                <p>
                                    {t("sections.capacity.p2")}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.sales.title")}</h2>
                                <p>
                                    {t("sections.sales.p1")}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.liability.title")}</h2>
                                <p>
                                    {t("sections.liability.p1")}
                                </p>
                                <p>
                                    {t("sections.liability.p2")}
                                </p>
                                <p>
                                    {t("sections.liability.p3")}
                                </p>
                                <p>
                                    {t("sections.liability.p4")}
                                </p>
                            </section>

                            <div className="border-t border-stroke-border/50 my-10"></div>

                            {/* Data Policy Section */}
                            <header className="border-b border-stroke-border/50 pb-8 mb-6">
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{t("dataPolicy.title")}</h1>
                            </header>

                            <p>
                                {t("dataPolicy.intro.p1")}
                            </p>
                            <p>
                                {t("dataPolicy.intro.p2")}
                            </p>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.responsible.title")}</h2>
                                <p>
                                    {t("dataPolicy.responsible.p1")}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.policy.title")}</h2>
                                <p>
                                    {t("dataPolicy.policy.p1")}
                                </p>
                                <p className="italic text-text-secondary/80">
                                    {t("dataPolicy.policy.p2")}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.nature.title")}</h2>
                                <p>
                                    {t("dataPolicy.nature.p1")}
                                </p>
                                <p>
                                    {t("dataPolicy.nature.p2")}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.purpose.title")}</h2>
                                <p>
                                    {t("dataPolicy.purpose.intro")}
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary">
                                    {(t.raw("dataPolicy.purpose.list") as string[]).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.sensitive.title")}</h2>
                                <p>
                                    {t("dataPolicy.sensitive.p1")}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.recipients.title")}</h2>
                                <p>
                                    {t("dataPolicy.recipients.intro")}
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary">
                                    {(t.raw("dataPolicy.recipients.list") as string[]).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.authorization.title")}</h2>
                                <p>{t("dataPolicy.authorization.p1")}</p>
                                <p>{t("dataPolicy.authorization.p2")}</p>
                                <p>{t("dataPolicy.authorization.p3")}</p>
                                <p>{t("dataPolicy.authorization.p4")}</p>
                                <p>{t("dataPolicy.authorization.p5")}</p>
                                <p>{t("dataPolicy.authorization.p6")}</p>
                                <p className="font-semibold text-white mt-4">{t("dataPolicy.authorization.p7")}</p>
                                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary">
                                    {(t.raw("dataPolicy.authorization.list") as string[]).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.rights.title")}</h2>
                                <p>
                                    {t("dataPolicy.rights.intro")}
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary">
                                    {(t.raw("dataPolicy.rights.list") as string[]).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.attention.title")}</h2>
                                <p>
                                    {t("dataPolicy.attention.p1")}
                                </p>
                                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                                    <p>
                                        {t("dataPolicy.attention.p2")}
                                    </p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.procedure.title")}</h2>
                                <p>
                                    {t("dataPolicy.procedure.intro")}
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary">
                                    {(t.raw("dataPolicy.procedure.list") as string[]).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.security.title")}</h2>
                                <p>
                                    {t("dataPolicy.security.p1")}
                                </p>
                                <p>
                                    {t("dataPolicy.security.p2")}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.copyright.title")}</h2>
                                <p>
                                    {t("dataPolicy.copyright.p1")}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("dataPolicy.validity.title")}</h2>
                                <p>
                                    {t("dataPolicy.validity.p1")}
                                </p>
                            </section>

                        </div>

                        <div className="flex justify-center pt-8 border-t border-stroke-border/50">
                            <Button intent="primary" onClick={handleBack}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                {t("backButton")}
                            </Button>
                        </div>

                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}

