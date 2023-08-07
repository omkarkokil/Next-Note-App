import Image from "next/image";
import AuthForm from "./components/AuthForm";
const page = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-full dark:bg-slate-900 bg-gray-50 items-center justify-center">
        <h2 className="text-3xl font-bold dark:text-white text-gray-900 leading-5">
          Sign in your account
        </h2>
        <AuthForm />
      </div>
    </>
  );
};

export default page;
