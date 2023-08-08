import React from "react";
import Note from "./components/Note";
import CreateNote from "./components/CreateNote";
import getNotes from "../actions/getUserNotes";
import getCurrentUser from "../actions/getCurrentUser";

const page = async () => {
  const notes = await getNotes();
  const currentUser = await getCurrentUser();
  return (
    <>
      <div className="h-screen transition-all overflow-auto pl-32 py-5 inline-block bg-gray-100 dark:bg-slate-900 w-full">
        <div className="dark:text-gray-50 leading-6 font-medium flex flex-col gap-2 text-gray-950">
          <h1 className="text-3xl ">Hii 👍 {currentUser?.name}</h1>
          <h2 className="text-xl">Welcome to Note app</h2>
        </div>
        <div className="flex flex-wrap gap-4 w-full mt-5 ">
          <CreateNote />
          {notes.map((ele) => (
            <Note
              title={ele.title}
              desc={ele.desc}
              id={ele.id}
              time={ele.createdAt}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
