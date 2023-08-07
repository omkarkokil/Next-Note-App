"use client";
import Input from "../Input";
import Button from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Modal() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  const OnSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/notes", data)
      .then(() => {
        console.log("completed");
        toast.success("Note created successfully");
      })
      .catch(() => toast.error("something went wrong"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      data-te-modal-init
      className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
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
              id="exampleModalLabel"
            >
              Add a Note
            </h5>
            <button
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              type="button"
              data-te-modal-dismiss
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="relative flex-auto p-4" data-te-modal-body-ref>
              <div className="mb-2">
                <Input
                  register={register}
                  label="Enter your title"
                  id="title"
                  type="text"
                />
              </div>
              <div>
                <Input
                  register={register}
                  label="Enter desc"
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
                danger
              >
                Close
              </Button>
              <Button type="submit">save changes</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
