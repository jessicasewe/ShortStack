import mongoose, { Schema } from "mongoose";

const pageSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    gradientFrom: {
      type: String,
      default: "#ff7e5f",
    },
    gradientTo: {
      type: String,
      default: "#feb47b",
    },
    bio: {
      type: String,
      default: "",
    },
    socialIcons: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],
    links: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Page = mongoose.model("Page", pageSchema);
export default Page;
