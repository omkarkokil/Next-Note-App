"use client";
import Button from "@/components/Button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "@/components/Modal/Modal";
import useModal from "@/hooks/useModal";

interface NoteProps {
  id: string;
  time: Date;
  title: string;
  desc: string;
}

const Note: FC<NoteProps> = ({ time, title, desc, id }) => {
  const router = useRouter();

  const { toggleModal } = useModal();

  // previous
  // const [editId, setEditId] = useState("");
  // const onClose = useCallback(() => {
  //   setEditId("");
  // }, [editId]);

  const onDelete = (id: string) => {
    axios
      .delete(`/api/notes/${id}`)
      .then(() => {
        toast.success("Note deleted successfully");
        router.refresh();
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };

  return (
    <>
      <div className=" w-[80vw] sm:w-[35vw] lg:w-[25vw]  h-max rounded-lg bg-neutral-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-slate-800">
        <div className="border-b-2 flex justify-between border-[#0000002d] px-6 py-3 dark:text-slate-50 text-black">
          <p>{format(new Date(time), "p PP")}</p>
          <div className="flex gap-3 items-center text-xl">
            <div
              onClick={() => onDelete(id)}
              className="text-danger p-1 rounded-lg dark:hover:bg-slate-50 hover:bg-gray-700 transition cursor-pointer"
            >
              <AiFillDelete />
            </div>
            <div
              onClick={() => toggleModal(id, "form")}
              data-te-toggle="modal"
              data-te-target="#exampleModal"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="text-success p-1 rounded-lg dark:hover:bg-slate-50 hover:bg-gray-700  transition cursor-pointer"
            >
              <BiEdit />
            </div>
          </div>
        </div>
        <div className="p-6 ">
          <h5 className="mb-2 text-xl font-medium leading-tight dark:text-slate-50 text-black">
            {title}
          </h5>
          <p className="text-md text-black dark:text-slate-400">
            {desc.slice(0, 100)} {desc.length > 100 && "..."}
          </p>
          <div
            className="mt-2 w-max h-max"
            data-te-toggle="modal"
            data-te-target="#exampleModal"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <Button
              onClick={() => {
                toggleModal(id, "note");
              }}
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
