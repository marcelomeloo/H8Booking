"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignOut() {
  return (
    <button
      className="text-stone-800 font-bold hover:text-stone-500 w-full transition-all"
      onClick={() => signOut()}
    >
      Sign me out
    </button>
  );
}
