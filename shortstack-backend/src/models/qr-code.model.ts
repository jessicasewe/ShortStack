import mongoose, { Schema } from "mongoose";

const qrCodeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    destinationUrl: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^(http|https):\/\/[^ "]+$/.test(v),
        message: "Invalid URL format",
      },
    },
    qrCodeData: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: "#000000",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const QRCode = mongoose.model("QRCode", qrCodeSchema);
export default QRCode;
