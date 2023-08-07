import Button from "@/components/Button";
import React from "react";
import { Ripple, initTE } from "tw-elements";
import Note from "./components/Note";
import CreateNote from "./components/CreateNote";
import getNotes from "../actions/getUserNotes";

const data = [
  {
    header: "10:20pm",
    title: "Hello there hows going",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi temporibus eos numquam quod ipsam obcaecati eligendi perferendis quo quibusdam? Beatae quos omnis voluptates officia recusandae exercitationem sed tenetur aliquid repellendus!",
  },
  {
    header: "10:20pm",
    title: "Hello there hows going",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi temporibus eos numquam quod ipsam obcaecati eligendi perferendis quo quibusdam? Beatae quos omnis voluptates officia recusandae exercitationem sed tenetur aliquid repellendus!",
  },
  {
    header: "10:20pm",
    title: "Hello there hows going",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing e",
  },
  {
    header: "10:20pm",
    title: "Hello there hows going",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi temporibus eos numquam quod ipsam obcaecati eligendi perferendis quo quibusdam? Beatae quos omnis voluptates officia recusandae exercitationem sed tenetur aliquid repellendus!",
  },
  {
    header: "10:20pm",
    title: "Hello there hows going",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi temporibus eos numquam quo",
  },
  {
    header: "10:20pm",
    title: "Hello there hows going",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi temporibus eos numquam quod ipsam obcaecati eligendi perferendis quo quibusdam? Beatae quos omnis voluptates officia recusandae exercitationem sed tenetur aliquid repellendus!",
  },
  {
    header: "10:20pm",
    title: "Hello there hows going",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi temporibus eos numquam quod ipsam obcaecati eligendi perferendis quo quibusdam? Beatae quos omnis voluptates officia recusandae exercitationem sed tenetur aliquid repellendus!",
  },
  {
    header: "10:20pm",
    title: "Hello there hows going",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing e",
  },
  {
    header: "10:20pm",
    title: "Hello there hows going",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi temporibus eos numquam quod ipsam obcaecati eligendi perferendis quo quibusdam? Beatae quos omnis voluptates officia recusandae exercitationem sed tenetur aliquid repellendus!",
  },
  {
    header: "10:20pm",
    title: "Hello there hows going",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi temporibus eos numquam quo",
  },
];

const page = async () => {
  const notes = await getNotes();
  return (
    <>
      <div className="h-screen transition-all overflow-auto pl-32 py-10 inline-block bg-gray-100 dark:bg-slate-900 w-full">
        <div className="flex flex-wrap gap-4 w-full ">
          <CreateNote />
          {notes.map((ele) => (
            <Note title={ele.title} desc={ele.desc} time={ele.createdAt} />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
