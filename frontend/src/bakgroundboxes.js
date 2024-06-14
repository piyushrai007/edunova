"use client";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "./utils/cn";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-screen w-screen relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Welcome to my blog
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        A place where I write about things I care about
      </p>
    </div>
  );
} 