"use client";

import { useEffect } from "react";
import { initAuth } from "@/utils/initAuth";

export const InitAuthClient = () => {
  useEffect(() => {
    initAuth();
  }, []);

  return null;
};
