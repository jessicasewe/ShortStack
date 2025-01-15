import QRCode from "qrcode";

export const generateQRCode = async (url: string): Promise<string> => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url);
    return qrCodeDataUrl;
  } catch (error) {
    throw new Error("Error generating QR Code");
  }
};
