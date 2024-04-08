"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <Image
          width={512}  
          height={512}
          src="/logo.png"
          alt="Platforms on Vercel"
          className="w-48 h-48"
        />
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-gray-800 font-bold text-2xl">
            Welcome to ITA Booking!
          </h1>
          <p className="text-gray-600 mt-5">
            This is the inaugural MVP of ITA Booking, the ultimate platform to reserve
            your favorite room in H8, ITA students most beloved place!
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="http://www.aeitaonline.com.br/wiki/index.php?title=Turma_de_2025"
            prefetch={false}
            className="text-gray-600 underline hover:text-gray-800 transition-all"
          >
            Made by ITA T25
          </Link>
          <p className="text-black">·</p>
          <a
            href="https://github.com/marcelomeloo/H8Booking"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 underline hover:text-gray-800 transition-all"
          >
            Our GitHub Repo
          </a>
          <p className="text-black">·</p>
          <button
            className="text-gray-600 underline hover:text-gray-800 transition-all"
            onClick={() => signOut()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
