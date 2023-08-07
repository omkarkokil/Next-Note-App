"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import AuthSocialButton from "./AuthSocialButton";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast/headless";

type variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/notes");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") setVariant("REGISTER");
    else setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant == "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch((err) => console.log("error in clinet", err))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            throw new Error("error in callback");
          }

          if (callback?.ok || !callback?.error) {
            console.log("success", data);
            router.push("/notes");
          }
        })
        .catch((err) => console.log("error", err))
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("something went wrong 404");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-800 p-2 shadow-md px-6 py-8 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {variant === "REGISTER" && (
              <Input
                id="name"
                register={register}
                type="text"
                disabled={isLoading}
                errors={errors}
                label="Enter your name"
              />
            )}
            <Input
              id="email"
              register={register}
              type="email"
              disabled={isLoading}
              errors={errors}
              label="Enter your email"
            />
            <Input
              id="password"
              register={register}
              type="password"
              disabled={isLoading}
              errors={errors}
              label="Enter your password"
            />
            <Button type="submit" fullwidth disabled={isLoading}>
              {variant === "LOGIN" ? "Login" : "Register"}
            </Button>
          </form>

          <div className="mt-6 flex items-center">
            <div className="w-full flex items-center gap-2 justify-center">
              <span className="border-t w-[30%] border-gray-300"></span>
              <p className="text-sm text-gray-500">Or continue with </p>
              <span className="w-[30%] border-t border-gray-300"></span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>

          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === "LOGIN" ? "New to Todos?" : "Already have ancount?"}
            </div>
            <div
              onClick={toggleVariant}
              className="hover:underline cursor-pointer"
            >
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
