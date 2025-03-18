'use client';

import { useRouter } from "next/navigation";

export const useGoHome = () => {
  const router = useRouter();
  return () => router.push("/");
};