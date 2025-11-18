import { connectDB } from "@/app/Lib/db";
import Note from "./model";

export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return Response.json(notes);
}

export async function POST(req) {
  await connectDB();
  const { title, text } = await req.json();

  const note = await Note.create({ title, text });
  return Response.json(note);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();

  await Note.findByIdAndDelete(id);

  return Response.json({ success: true });
}


export async function PUT(req) {
  await connectDB();
  const { id, title, text } = await req.json(); 

  const updated = await Note.findByIdAndUpdate(
    id,
    { title, text }, 
    { new: true }
  );

  return Response.json(updated);
}