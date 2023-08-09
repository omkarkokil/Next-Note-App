"use client";

import Modal from "@/components/Modal/Modal";
import useModal from "@/hooks/useModal";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const CreateNote = () => {
  const { toggleModal } = useModal();

  useEffect(() => {
    const init = async () => {
      const { Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Modal, Ripple });
    };
    init();
  }, []);

  return (
    <>
      <div
        className="flex w-[80vw] sm:w-[35vw] lg:w-[25vw] h-[20vh] lg:h-[31vh] rounded-lg bg-neutral-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-slate-800  items-center justify-center cursor-pointer"
        data-te-toggle="modal"
        data-te-target="#exampleModal"
        onClick={() => toggleModal("")}
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <div className="dark:text-slate-50 text-black text-[5rem]">
          <AiOutlinePlus />
        </div>
      </div>

      <Modal />
    </>
  );
};

export default CreateNote;
