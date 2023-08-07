"use client";
import Button from "@/components/Button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface NoteProps {
  time: Date;
  title: string;
  desc: string;
}

const Note: FC<NoteProps> = ({ time, title, desc }) => {
  const router = useRouter();
  return (
    <div className="block w-[25vw] h-max rounded-lg bg-neutral-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-slate-800">
      <div className="border-b-2 border-[#0000002d] px-6 py-3 dark:text-slate-50 text-black">
        {format(new Date(time), "p")}
      </div>
      <div className="p-6 ">
        <h5 className="mb-2 text-xl font-medium leading-tight dark:text-slate-50 text-black">
          {title}
        </h5>
        <p className="text-md text-black dark:text-slate-400">
          {desc.slice(0, 100)}
        </p>
        <div className="mt-2">
          <Button onClick={() => router.push("/ch")}>Read More</Button>
        </div>
      </div>
    </div>
  );
};

export default Note;
