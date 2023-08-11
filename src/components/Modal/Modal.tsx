"use client";
import Input from "../Input";
import Button from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FC, useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";
import { useGetNoteById, NoteData } from "@/hooks/useGetNoteById";
import { Notes } from "@prisma/client";
import "tw-elements/dist/css/tw-elements.min.css";
import LoadingModal from "./LoadingModal";

interface NoteId {
  onClose?: () => void;
}

const Modal: FC<NoteId> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id, variant } = useModal();
  const data: NoteData = useGetNoteById(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  useEffect(() => {
    if (!id) {
      setValue("title", "");
      setValue("desc", "");
      setIsLoading(false);
      return;
    }

    setValue("title", data.title);
    setValue("desc", data.desc);
  }, [variant, data, id]);

  const OnSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (id === "" || id === undefined) {
      setIsLoading(true);
      setValue("title", "", { shouldValidate: true });
      setValue("desc", "", { shouldValidate: true });
      await axios
        .post("/api/notes", data)
        .then(() => {
          toast.success("Note created successfully");
          router.refresh();
        })
        .catch(() => toast.error("something went wrong"))
        .finally(() => setIsLoading(false));
    }

    if (id) {
      setIsLoading(true);

      await axios
        .post(`/api/notes/${id}`, data)
        .then(() => {
          toast.success("Note updated successfully");
          router.refresh();
        })
        .catch(() => toast.error("something went wrong"))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        data-te-modal-init
        className="fixed left-0 top-10 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="note-app"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none  bg-clip-padding text-current shadow-lg outline-none bg-gray-100 dark:bg-slate-900">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 dark:border-[#ffffff2d] border-[#0000002d] p-4 ">
              <h5
                className="text-xl font-medium leading-normal dark:text-gray-200 text-gray-700"
                id="note-app"
              >
                {(variant === "form" && id && "Edit Note") ||
                  (!id && "Add a Note")}
                {variant === "note" && data.title}
              </h5>
              <button
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                type="button"
                data-te-modal-dismiss
                onClick={onClose}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {variant === "note" ? (
              <div className="py-6 px-4 text-medium dark:text-gray-300 text-gray-600 text-[.9em]">
                {data.desc}
              </div>
            ) : (
              <form onSubmit={handleSubmit(OnSubmit)}>
                <div className="relative flex-auto p-4" data-te-modal-body-ref>
                  <div className="mb-2">
                    <Input
                      register={register}
                      label="Enter your title"
                      errors={errors}
                      id="title"
                      type="text"
                    />
                  </div>
                  <div>
                    <Input
                      register={register}
                      label="Enter desc"
                      errors={errors}
                      id="desc"
                      type="text"
                    />
                  </div>
                </div>

                <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 dark:border-[#ffffff2d] border-[#0000002d] p-4 gap-2 ">
                  <Button
                    type="button"
                    data-te-modal-dismiss
                    aria-label="Close"
                    secondary
                    danger
                  >
                    Close
                  </Button>
                  <Button type="submit">save changes</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
