"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { UserButton, useAuth } from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { userId } = useAuth();

  const router = useRouter();

  return (
    <nav className="w-full mx-auto xl:px-20 px-6 py-6 shadow-sm">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
        {!userId && (
          <div className="flex gap-2">
            <Button
              size="lg"
              onClick={() => router.push("/sign-in")}
              className="w-[140px]"
            >
              Entrar
            </Button>
            <Button
              size="lg"
              onClick={() => router.push("/sign-up")}
              className="w-[140px]"
            >
              Cadastre-se
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
