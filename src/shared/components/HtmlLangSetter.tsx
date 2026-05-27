"use client";

import { useEffect } from "react";

interface HtmlLangSetterProps {
  locale: string;
}

export default function HtmlLangSetter({ locale }: HtmlLangSetterProps) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
