import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^(http|https):\/\/[^ "]+$/.test(v),
      message: "Invalid URL format",
    },
    password: { type: String, required: false },
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
