"use client";

import { Suspense } from "react";
import Login from "@/component/auth/Login";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>লোড হচ্ছে...</div>}>
      <Login />
    </Suspense>
  );
}
