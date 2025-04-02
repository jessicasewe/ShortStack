import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^(http|https):\/\/[^ "]+$/.test(v),
      message: "Invalid URL format",
    },
  },
  title: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
