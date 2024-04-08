"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import GoogleButton from 'react-google-button'
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Form({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
      <GoogleButton onClick={() => {
        signIn("google", { callbackUrl: "/home" });
      }}
        className="my-4 mx-auto"
      />
  );
}
