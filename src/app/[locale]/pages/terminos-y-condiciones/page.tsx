"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";
import Button from "@/shared/components/Button";
import { ArrowLeft } from "lucide-react";
import { localizeInternalHref } from "@/shared/utils/localizedNavigation";

export default function TerminosYCondicionesPage() {
    const locale = useLocale();
    const homeHref = localizeInternalHref("/", locale);
    const t = useTranslations("AppTerms");

    return (
        <main className="bg-black text-text-secondary min-h-screen pt-32 pb-20">
            <SectionWrapper>
                <div className="max-w-4xl mx-auto">
                    {/* Header Action */}
                    <div className="mb-8">
                        <Link href={homeHref}>
                            <Button intent="ghost" size="sm" className="pl-0 text-primary hover:text-white hover:bg-transparent">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                {t("backButton")}
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-8 bg-bg-secondary/30 p-8 md:p-12 rounded-2xl border border-stroke-border/30 backdrop-blur-sm">
                        <header className="border-b border-stroke-border/50 pb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{t("title")}</h1>
                            <p className="text-primary font-medium">{t("domain")}</p>
                        </header>

                        <div className="space-y-6 text-sm md:text-base leading-relaxed">
                            <p>{t("intro")}</p>

                            {/* 1. INFO */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.info.title")}</h2>
                                <p>{t("sections.info.p1")}</p>
                                <p>{t("sections.info.p2")}</p>
                                <p>{t("sections.info.p3")}</p>
                                <p>{t("sections.info.p4")}</p>
                            </section>

                            {/* 2. PRODUCTS */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.products.title")}</h2>
                                <p>{t("sections.products.p1")}</p>
                                <p>{t("sections.products.p2")}</p>
                            </section>

                            {/* 3. CAPACITY */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.capacity.title")}</h2>
                                <p>{t("sections.capacity.p1")}</p>
                                <p>{t("sections.capacity.p2")}</p>
                            </section>

                            {/* 4. EXPORT CONTROL */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.exportControl.title")}</h2>
                                <p>{t("sections.exportControl.p1")}</p>
                            </section>

                            {/* 5. SALES */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.sales.title")}</h2>
                                <p>{t("sections.sales.p1")}</p>
                            </section>

                            {/* 6. LIABILITY */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.liability.title")}</h2>
                                <p>{t("sections.liability.p1")}</p>
                                <p>{t("sections.liability.p2")}</p>
                                <p>{t("sections.liability.p3")}</p>
                                <p>{t("sections.liability.p4")}</p>
                            </section>

                            {/* 7. REGISTRATION */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.registration.title")}</h2>
                                <p>{t("sections.registration.p1")}</p>
                                <p>{t("sections.registration.p2")}</p>
                            </section>

                            {/* 8. PROHIBITED USES */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.prohibitedUses.title")}</h2>
                                <p>{t("sections.prohibitedUses.p1")}</p>
                                <p>{t("sections.prohibitedUses.p2")}</p>
                                <p>{t("sections.prohibitedUses.p3")}</p>
                            </section>

                            {/* 9. VALIDITY AND PRICES */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.validityAndPrices.title")}</h2>
                                <p>{t("sections.validityAndPrices.p1")}</p>
                                <p>{t("sections.validityAndPrices.p2")}</p>
                                <p>{t("sections.validityAndPrices.p3")}</p>
                                <p>{t("sections.validityAndPrices.p4")}</p>
                            </section>

                            {/* 10. AVAILABILITY */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.availability.title")}</h2>
                                <p>{t("sections.availability.p1")}</p>
                            </section>

                            {/* 11. PAYMENT FORMS */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.paymentForms.title")}</h2>
                                <p>{t("sections.paymentForms.p1")}</p>
                            </section>

                            {/* 12. PAYMENT METHODS */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.paymentMethods.title")}</h2>
                                <p>{t("sections.paymentMethods.intro")}</p>
                                <div className="pl-4 border-l-2 border-primary/30 space-y-6 mt-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">{t("sections.paymentMethods.creditCard.title")}</h3>
                                        <p>{t("sections.paymentMethods.creditCard.p1")}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">{t("sections.paymentMethods.atm.title")}</h3>
                                        <p>{t("sections.paymentMethods.atm.p1")}</p>
                                        <p className="mt-2">{t("sections.paymentMethods.atm.p2")}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">{t("sections.paymentMethods.crypto.title")}</h3>
                                        <p>{t("sections.paymentMethods.crypto.p1")}</p>
                                        <p className="mt-2 text-white bg-primary/10 p-4 rounded-lg">{t("sections.paymentMethods.crypto.p2")}</p>
                                        <p className="mt-2">{t("sections.paymentMethods.crypto.p3")}</p>
                                        <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-primary">
                                            {(t.raw("sections.paymentMethods.crypto.list") as string[]).map((item: string, index: number) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">{t("sections.paymentMethods.bankTransfer.title")}</h3>
                                        <p>{t("sections.paymentMethods.bankTransfer.p1")}</p>
                                    </div>
                                </div>
                            </section>

                            {/* 13. PURCHASE CONTRACT */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.purchaseContract.title")}</h2>
                                <p>{t("sections.purchaseContract.p1")}</p>
                            </section>

                            {/* 14. DELIVERY */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.delivery.title")}</h2>
                                <p>{t("sections.delivery.p1")}</p>
                                <p>{t("sections.delivery.p2")}</p>
                            </section>

                            {/* 15. DELIVERY ISSUES */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.deliveryIssues.title")}</h2>
                                <p>{t("sections.deliveryIssues.p1")}</p>
                                <p>{t("sections.deliveryIssues.p2")}</p>
                            </section>

                            {/* 16. RETURNS */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.returns.title")}</h2>
                                <p>{t("sections.returns.p1")}</p>
                                <p>{t("sections.returns.p2")}</p>
                                <p>{t("sections.returns.p3")}</p>
                                <p>{t("sections.returns.p4")}</p>
                            </section>

                            {/* 17. RETRACT */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.retract.title")}</h2>
                                <p>{t("sections.retract.p1")}</p>
                                <p>{t("sections.retract.p2")}</p>
                            </section>

                            {/* 18. WARRANTY EXEMPTIONS */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.warrantyExemptions.title")}</h2>
                                <p className="font-semibold text-white">{t("sections.warrantyExemptions.intro")}</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-primary">
                                    {(t.raw("sections.warrantyExemptions.list") as string[]).map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <p className="mt-4">{t("sections.warrantyExemptions.p1")}</p>
                                <p>{t("sections.warrantyExemptions.p2")}</p>
                            </section>

                            {/* 19. OWNERSHIP */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.ownership.title")}</h2>
                                <p>{t("sections.ownership.p1")}</p>
                                <p>{t("sections.ownership.p2")}</p>
                                <p>{t("sections.ownership.p3")}</p>
                                <p>{t("sections.ownership.p4")}</p>
                                <p>{t("sections.ownership.p5")}</p>
                                <p>{t("sections.ownership.p6")}</p>
                                <p>{t("sections.ownership.p7")}</p>
                                <p>{t("sections.ownership.p8")}</p>
                                <p>{t("sections.ownership.p9")}</p>
                                <p>{t("sections.ownership.p10")}</p>
                                <p>{t("sections.ownership.p11")}</p>
                                <p>{t("sections.ownership.p12")}</p>
                            </section>

                            {/* 20. JURISDICTION */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.jurisdiction.title")}</h2>
                                <p>{t("sections.jurisdiction.p1")}</p>
                                <p>{t("sections.jurisdiction.p2")}</p>
                                <p>{t("sections.jurisdiction.p3")}</p>
                            </section>

                            {/* 21. OTHER PROVISIONS */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.otherProvisions.title")}</h2>
                                <p>{t("sections.otherProvisions.p1")}</p>
                            </section>

                            {/* 22. LIABILITY DETAIL */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.liabilityDetail.title")}</h2>
                                <p className="font-semibold text-white">{t("sections.liabilityDetail.intro")}</p>
                                <p>{t("sections.liabilityDetail.p1")}</p>
                                <p>{t("sections.liabilityDetail.p2")}</p>
                                <p>{t("sections.liabilityDetail.p3")}</p>
                                <p>{t("sections.liabilityDetail.p4")}</p>
                                <p>{t("sections.liabilityDetail.p5")}</p>
                                <p>{t("sections.liabilityDetail.p6")}</p>
                                <p>{t("sections.liabilityDetail.p7")}</p>
                            </section>

                            {/* 23. CONTACT */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.contact.title")}</h2>
                                <p>{t("sections.contact.p1")}</p>
                                <p>{t("sections.contact.p2")}</p>
                            </section>

                            {/* 24. FORCE MAJEURE */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.forceMajeure.title")}</h2>
                                <p>{t("sections.forceMajeure.p1")}</p>
                            </section>

                            {/* 25. DISPUTES */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.disputes.title")}</h2>
                                <p>{t("sections.disputes.p1")}</p>
                                <p>{t("sections.disputes.p2")}</p>
                                <p>{t("sections.disputes.p3")}</p>
                                <p>{t("sections.disputes.p4")}</p>
                                <p>{t("sections.disputes.p5")}</p>
                                <p>{t("sections.disputes.p6")}</p>
                            </section>

                            {/* 26. MISCELLANEOUS */}
                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">{t("sections.miscellaneous.title")}</h2>
                                <p>{t("sections.miscellaneous.p1")}</p>
                                <p>{t("sections.miscellaneous.p2")}</p>
                            </section>
                        </div>

                        <div className="flex justify-center pt-8 border-t border-stroke-border/50">
                            <Link href={homeHref}>
                                <Button intent="primary">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    {t("backButton")}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
