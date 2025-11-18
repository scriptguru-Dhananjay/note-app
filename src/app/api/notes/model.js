import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },  
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
