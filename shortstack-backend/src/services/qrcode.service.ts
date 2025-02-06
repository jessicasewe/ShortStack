import QRCode from "qrcode";

export const generateQRCode = async (
  url: string,
  color: string = "#000000"
): Promise<string> => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      color: {
        dark: color, // Apply the selected color
        light: "#FFFFFF", // Background color (white)
      },
    });
    return qrCodeDataUrl;
  } catch (error) {
    throw new Error("Error generating QR Code");
  }
};
