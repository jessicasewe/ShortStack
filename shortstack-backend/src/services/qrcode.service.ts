import QRCode from "qrcode";

export const generateQRCode = async (
  url: string,
  color: string = "#000000",
  backgroundColor: string = "#FFFFFF"
): Promise<string> => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      color: {
        dark: color,
        light: backgroundColor,
      },
    });
    return qrCodeDataUrl;
  } catch (error) {
    throw new Error("Error generating QR Code");
  }
};
