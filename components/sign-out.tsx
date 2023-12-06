"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import LoadingDots from "./loading-dots";

export default function SignOut() {
  const [loading, setLoading] = useState(false);
  return (
    <button
      className="text-stone-800 font-bold hover:text-stone-500 w-full transition-all"
      onClick={async () => {
        setLoading(true);
        await signOut()
        setLoading(false);
      }}
      disabled={loading}
    >
      {loading ? (
        <LoadingDots color="#808080" />
      ) : (
        "Sign me out"
      )}
    </button>
  );
}
