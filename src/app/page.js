import Image from "next/image";

import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 

  const notes = await fetch(`${baseUrl}/api/notes`, {
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <div className="bg-linear-to-bl from-[#F7F8F8] to-[#ACBB78] min-h-screen flex items-center justify-center p-4">
      <form className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md">
        <div className="flex  items-center justify-between">
          <h1 className="text-3xl font-bold mb-6">Notes-App</h1>
          <Image
            src="/note.png"
            alt="logo"
            width={40}
            height={40}
            className="relative -mt-5"
          />
        </div>

        
        <NoteEditor />

        
        <NotesList notes={notes} />
      </form>
    </div>
  );
}



